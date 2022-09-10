import { makeAutoObservable } from 'mobx';

export interface INote {
  id: number;
  title: string;
  content: string;
  date: string;
  isEditing: boolean;
}

const handleRemoveNote = (id: number, notes: INote[]): INote[] => {
  return notes.filter((note) => note.id !== id);
};

const handleSelectNote = (id: number, notes: INote[]): INote | undefined => {
  return notes.find((note) => note.id === id);
};

const getDate = () => {
  const date = new Date().toLocaleString();

  return date;
};

class Store {
  notes: INote[] = [
    {
      id: Math.random() * 100,
      title: 'To-do List of smart HR',
      content:
        '1) Hire Jeyhun Farajov 2)Enjoy his work',
      date: '09/10/2022',
      isEditing: false,
    },
    {
      id: Math.random() * 100,
      title: 'Achieve success',
      content: 'Whatever it takes',
      date: '07/25/1996',
      isEditing: false,
    },
  ];
  selectedNote: undefined | INote;
  search = '';

  constructor() {
    makeAutoObservable(this);
  }

  addNote() {
    const newNote = {
      id: Math.random() * 100,
      title: 'New note',
      content: '',
      date: getDate(),
      isEditing: true,
    };
    this.notes.push(newNote);
    this.selectedNote = handleSelectNote(newNote.id, this.notes);
  }

  removeNote(id: number) {
    this.notes = handleRemoveNote(id, this.notes);
  }

  selectNote(id: number) {
    this.selectedNote = handleSelectNote(id, this.notes);
  }

  handleEditing() {
    if (!store.selectedNote) {
      return;
    }
    store.selectedNote!.isEditing = !store.selectedNote?.isEditing;
  }
}

const store = new Store();
export default store;
