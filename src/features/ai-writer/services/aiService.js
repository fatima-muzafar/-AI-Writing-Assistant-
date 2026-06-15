const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function generateContent(
  prompt,
  model = "deepseek/deepseek-chat",
  onToken,
  streaming = false
) {
  try {
    const payload = {
      model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    };

    if (streaming) {
      payload.stream = true;
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "AI request failed");
    }

    if (streaming && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let output = "";
      let doneReading = false;

      while (!doneReading) {
        const { done, value } = await reader.read();
        if (done) {
          doneReading = true;
        }

        if (value) {
          buffer += decoder.decode(value, { stream: true });
        }

        const parts = buffer.split(/\r?\n/);
        buffer = parts.pop();

        for (const part of parts) {
          const line = part.trim();
          if (!line) continue;

          if (line.startsWith("data:")) {
            const payloadText = line.replace(/^data:\s*/, "");
            if (payloadText === "[DONE]") {
              doneReading = true;
              break;
            }

            try {
              const payloadJson = JSON.parse(payloadText);
              const delta = payloadJson?.choices?.[0]?.delta?.content;
              if (delta) {
                output += delta;
                if (typeof onToken === "function") {
                  onToken(delta);
                }
              }
            } catch (error) {
              // ignore parse failures for partial stream lines
            }
          }
        }
      }

      return output;
    }

    const data = await response.json();

    return data.choices[0].message?.content || "";

  } catch (error) {
    console.error(error);
    return "Error generating response";
  }
}