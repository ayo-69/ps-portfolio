import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const result = await sql`
      SELECT filename, original_name, uploaded_at
      FROM resume 
      WHERE is_active = true
      LIMIT 1
    `;

    if (result.length > 0) {
      return Response.json({
        exists: true,
        filename: result[0].original_name,
        uploadedAt: result[0].uploaded_at
      });
    } else {
      return Response.json({
        exists: false
      });
    }

  } catch (error) {
    console.error('Error checking resume:', error);
    return Response.json(
      { error: 'Failed to check resume' },
      { status: 500 }
    );
  }
}