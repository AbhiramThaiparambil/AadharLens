export function cleanText(text: string): string {
  return text.replace(/\n+/g, ' ').replace(/\s+/g, ' ');
}
export function extractUid(combinedText: string): string | undefined {
  const match = combinedText.match(/\b\d{4}\s?\d{4}\s?\d{4}\b/);
  if (!match) return undefined;
  return match[0].replace(/\s/g, '');
}
export function extractDob(cleanFrontText: string): string | undefined {
  const match =
    cleanFrontText.match(/(?:DOB|Date of Birth|YOB|Year of Birth)[^\d]*([\d/]+)/i) ||
    cleanFrontText.match(/\b(\d{2}\/\d{2}\/\d{4})\b/);
  return match?.[1];
}
export function extractGender(cleanFrontText: string): string | undefined {
  const match = cleanFrontText.match(/\b(MALE|FEMALE|TRANSGENDER)\b/i);
  return match?.[1]?.toUpperCase();
}
export function extractName(frontText: string): string | undefined {
  const lines = frontText.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i]?.match(/(?:DOB|Date of Birth|YOB|\b\d{2}\/\d{2}\/\d{4}\b)/i)) {
      const prev = lines[i - 1] ?? '';
      const prevPrev = lines[i - 2] ?? '';
      const candidate = /^[A-Za-z\s]+$/.test(prev)
        ? prev
        : /^[A-Za-z\s]+$/.test(prevPrev)
          ? prevPrev
          : prev;
      const name = candidate.replace(/[^a-zA-Z\s]/g, '').trim();
      return name || undefined;
    }
  }
  return undefined;
}
export function extractAddress(backText: string, cleanBackText: string): string | undefined {
  const match = backText.match(/Address[\s:]*(.*?)(\b\d{6}\b|$)/is);
  if (match) {
    return (match[1] ?? '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim() || undefined;
  }
  const idx = cleanBackText.toLowerCase().indexOf('address');
  if (idx !== -1) return cleanBackText.substring(idx + 7).trim() || undefined;
  return cleanBackText.substring(0, 150).trim() || undefined;
}
export function extractPincode(combinedText: string): string | undefined {
  return combinedText.match(/\b\d{6}\b/)?.[0];
}
export function extractMobile(combinedText: string): string | undefined {
  return combinedText.match(/\b([6-9]\d{9})\b/)?.[0];
}
