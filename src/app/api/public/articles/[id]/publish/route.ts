import { NextRequest, NextResponse } from "next/server";
import { HTTPEndpointDynamic } from "@/core/constants/endpoints";
import http from "@/server/integration/http";
import { PublishArticleResponseSchema } from "@/server/article/_internal/schema";
import * as v from "valibot";
import { Params } from "@/app/api/_internal/type";

export async function POST(req: NextRequest, {params} : Params) {
  try {
    const {id} = await params
    const raw = await http
      .post(HTTPEndpointDynamic.PUBLISH_ARTICLE(Number(id)))
      .json();
    const response = v.parse(PublishArticleResponseSchema, raw);

    return NextResponse.json({ _metadata: { success: true }, result: response.result });
  } catch (error) {
    console.error("❌ Failed to publish article:", error);
    return NextResponse.json(
      { _metadata: { success: false }, error: "Failed to publish article" },
      { status: 400 }
    );
  }
}
