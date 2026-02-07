import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();

    const freeModels = data.data.filter((model) => {
      const promptPrice = parseFloat(model.price?.prompt || "0");
      const completionPrice = parseFloat(model.pricing?.completion || "0");
      return promptPrice === 0 && completionPrice === 0;
    });

    const formattedModel = freeModels.map((model) => ({
      id: model.id,
      name: model.name,
      description: model.description,
      context_length: model.context_length,
      architecture: model.architecture,
      pricing: model.pricing,
      top_provider: model.top_provider,
    }));

    return NextResponse.json({ models: formattedModel }, { status: 200 });
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "failed to fetch models",
      },
      { status: 500 },
    );
  }
}
