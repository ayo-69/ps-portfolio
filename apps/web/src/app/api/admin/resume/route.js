import sql from "@/app/api/utils/sql";

export async function PUT(request) {
  try {
    const body = await request.json();
    const { googleDriveUrl } = body;

    if (!googleDriveUrl) {
      return Response.json(
        { error: "Google Drive URL is required" },
        { status: 400 },
      );
    }

    // Convert Google Drive view URL to direct download URL
    const fileIdMatch = googleDriveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!fileIdMatch) {
      return Response.json(
        { error: "Invalid Google Drive URL" },
        { status: 400 },
      );
    }

    const fileId = fileIdMatch[1];
    const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // First, deactivate any existing resume
    await sql`
      UPDATE resume 
      SET is_active = false 
      WHERE is_active = true
    `;

    // Insert the new resume
    const result = await sql`
      INSERT INTO resume (filename, original_name, file_url, is_active)
      VALUES ('Praise_Sylvester_Resume.pdf', 'Praise_Sylvester_Resume.pdf', ${directDownloadUrl}, true)
      RETURNING *
    `;

    return Response.json({
      success: true,
      resume: result[0],
    });
  } catch (error) {
    console.error("Error saving Google Drive resume:", error);
    return Response.json(
      { error: "Failed to save resume from Google Drive" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, filename, originalName } = body;

    if (!url || !filename) {
      return Response.json(
        { error: "URL and filename are required" },
        { status: 400 },
      );
    }

    // First, deactivate any existing resume
    await sql`
      UPDATE resume 
      SET is_active = false 
      WHERE is_active = true
    `;

    // Insert the new resume
    const result = await sql`
      INSERT INTO resume (filename, original_name, file_url, is_active)
      VALUES (${filename}, ${originalName || filename}, ${url}, true)
      RETURNING *
    `;

    return Response.json({
      success: true,
      resume: result[0],
    });
  } catch (error) {
    console.error("Error saving resume:", error);
    return Response.json({ error: "Failed to save resume" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    // Deactivate the current resume
    await sql`
      UPDATE resume 
      SET is_active = false 
      WHERE is_active = true
    `;

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error removing resume:", error);
    return Response.json({ error: "Failed to remove resume" }, { status: 500 });
  }
}
