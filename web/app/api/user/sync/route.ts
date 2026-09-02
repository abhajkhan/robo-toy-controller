import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? "";

    const sql = `
      INSERT INTO users (id, clerk_id, email, first_name, last_name, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        email = VALUES(email),
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        image_url = VALUES(image_url)
    `;

    try {
      await query(sql, [
        user.id,
        user.id,
        primaryEmail,
        user.firstName ?? "",
        user.lastName ?? "",
        user.imageUrl ?? "",
      ]);
    } catch (dbErr) {
      console.warn("[USER SYNC] MySQL database write skipped or failed:", dbErr);
      return NextResponse.json({
        success: true,
        syncedToDb: false,
        warning: "MySQL server unreachable or error",
        user: {
          id: user.id,
          email: primaryEmail,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    }

    return NextResponse.json({
      success: true,
      syncedToDb: true,
      user: {
        id: user.id,
        email: primaryEmail,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("[USER SYNC ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
