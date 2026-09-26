import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { Readable } from "node:stream";
import { getPackage } from "@/lib/downloads";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

/**
 * Streams a product ZIP as a file download. The files live in private/downloads/
 * (gitignored, built by `npm run downloads`), never under public/.
 *
 * Paywall, later: verify the buyer's token here before streaming.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return new Response("Not found", { status: 404 });

  const file = join(process.cwd(), "private", "downloads", `${slug}.zip`);
  let size: number;
  try {
    size = (await stat(file)).size;
  } catch {
    return new Response(`This download is being prepared. Please email ${site.email} and we will send it to you.`, {
      status: 503,
      headers: { "Retry-After": "3600", "Cache-Control": "no-store" },
    });
  }

  const asciiName = pkg.zipName.replace(/[^\x20-\x7e]/g, "_").replace(/"/g, "");
  const stream = Readable.toWeb(createReadStream(file)) as ReadableStream;

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Length": String(size),
      "Content-Disposition": `attachment; filename="${asciiName}"; filename*=UTF-8''${encodeURIComponent(pkg.zipName)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    },
  });
}
