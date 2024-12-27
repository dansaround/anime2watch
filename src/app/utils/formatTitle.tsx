export function formatTitle(limit: number, title: string) {
  if (title.length > limit) {
    return title.slice(0, limit) + "...";
  } else {
    return title;
  }
}
