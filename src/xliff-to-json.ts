// @ts-ignore
import { xliff12ToJs } from "xliff"

export async function xliffToJson(translations: any) {
  const parserResult = await xliff12ToJs(translations, {
    captureSpacesBetweenElements: true,
  });
  const xliffContent = parserResult.resources["ng2.template"];

  return Object.keys(xliffContent).reduce((result: any, current) => {
    const translation = xliffContent[current].target;
    if (typeof translation === "string") {
      result[current] = translation;
    } else if (Array.isArray(translation)) {
      result[current] = translation
        .map((entry) =>
          typeof entry === "string" ? entry : `{{${entry.Standalone.id}}}`,
        )
        .map((entry) => entry.replace("{{", "{$").replace("}}", "}"))
        .join("");
    } else {
      throw new Error("Could not parse XLIFF: " + JSON.stringify(translation));
    }
    return result;
  }, {});
}
