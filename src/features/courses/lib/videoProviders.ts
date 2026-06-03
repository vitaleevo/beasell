export type VideoProvider = "youtube" | "vimeo";

export type NormalizedVideoSource = {
  provider: VideoProvider;
  embedUrl: string;
  videoId: string;
};

const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{6,}$/;
const VIMEO_ID_PATTERN = /^\d{6,}$/;

function firstPathSegment(pathname: string) {
  return pathname.split("/").filter(Boolean)[0] ?? "";
}

function youtubeIdFromUrl(url: URL) {
  const host = url.hostname.replace(/^www\./, "");

  if (host === "youtu.be") {
    return firstPathSegment(url.pathname);
  }

  if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
    const fromQuery = url.searchParams.get("v");
    if (fromQuery) return fromQuery;

    const segments = url.pathname.split("/").filter(Boolean);
    if (["embed", "shorts", "live"].includes(segments[0])) {
      return segments[1] ?? "";
    }
  }

  return "";
}

function vimeoIdFromUrl(url: URL) {
  const host = url.hostname.replace(/^www\./, "");
  if (!host.endsWith("vimeo.com")) return "";

  const segments = url.pathname.split("/").filter(Boolean);
  const videoSegmentIndex = segments.findIndex((segment) => segment === "video");
  const candidate =
    videoSegmentIndex >= 0
      ? segments[videoSegmentIndex + 1]
      : segments.find((segment) => /^\d+$/.test(segment));

  return candidate ?? "";
}

export function normalizeVideoSource(value: string): NormalizedVideoSource | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    const youtubeId = youtubeIdFromUrl(url);
    if (YOUTUBE_ID_PATTERN.test(youtubeId)) {
      return {
        provider: "youtube",
        videoId: youtubeId,
        embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
      };
    }

    const vimeoId = vimeoIdFromUrl(url);
    if (VIMEO_ID_PATTERN.test(vimeoId)) {
      return {
        provider: "vimeo",
        videoId: vimeoId,
        embedUrl: `https://player.vimeo.com/video/${vimeoId}`,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function videoProviderLabel(provider: VideoProvider | undefined) {
  if (provider === "vimeo") return "Vimeo";
  return "YouTube";
}
