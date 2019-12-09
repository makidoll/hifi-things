declare namespace AvatarBookmarks {
	interface BookmarkData {
		version: number;
		avatarUrl: string;
		avatarScale: string;
		avatarEntities: Entities.EntityProperties[];
		attachments: any[];
	}

	function addBookmark(bookmarkName: string): void;
	function getBookmarks(): { [s: string]: BookmarkData };
	function loadBookmark(bookmarkName: string): void;
	function removeBookmark(bookmarkName: string): void;
}
