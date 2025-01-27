import { Injectable } from '@angular/core';
import { NostrEventDocument, NostrNoteDocument, NostrProfile, NostrProfileDocument } from './interfaces';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  items: NostrNoteDocument[] = [];

  constructor(private db: StorageService) {}

  /** Notes are upserts, we replace the existing note and only keep latest. */
  async putNote(document: NostrNoteDocument | any) {
    await this.db.storage.putNote(document);
  }

  async deleteNote(id: string) {
    await this.db.storage.deleteNote(id);
  }

  async load() {
    this.items = await this.db.storage.getNotes();
  }

  /** Wipes all notes. */
  async wipe() {
    await this.db.storage.deleteNotes();
  }
}
