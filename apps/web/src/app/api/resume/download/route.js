import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    // Direct redirect to Dropbox resume link
    const dropboxUrl =
      "https://www.dropbox.com/scl/fi/dyu3ix359fsjyco1ileto/Praise_Sylvester_CV-new-update.pdf?rlkey=jjdjmaz15m0xoze9ku5xmla5k&st=9wf3soi7&dl=1";

    return Response.redirect(dropboxUrl, 302);
  } catch (error) {
    console.error("Error redirecting to resume:", error);
    return Response.json({ error: "Failed to access resume" }, { status: 500 });
  }
}
