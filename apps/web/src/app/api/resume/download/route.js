import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    // Direct redirect to Dropbox resume link
    const dropboxUrl =
      "https://www.dropbox.com/scl/fi/hc614o6g7vj20gqpqox72/Isaac-Hayab-Resume.pdf?rlkey=txhxhwh5l4rr8mpityaj6s0sx&st=565q5o47&dl=1";

    return Response.redirect(dropboxUrl, 302);
  } catch (error) {
    console.error("Error redirecting to resume:", error);
    return Response.json({ error: "Failed to access resume" }, { status: 500 });
  }
}
