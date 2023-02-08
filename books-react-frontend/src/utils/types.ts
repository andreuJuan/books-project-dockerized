/**
 * Interface used for managing the books
 */
export interface Book {
  id: number;
  // Book titles are unique
  title: string;
  author: string;
  summary?: string | null;
}

/**

 * Interface used to manage the nullable data in the book creation/edit modal
 */
export interface ModalData {
  title?: string | null;
  author?: string | null;
  summary?: string | null;
}
