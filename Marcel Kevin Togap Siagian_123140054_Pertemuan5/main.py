from abc import ABC, abstractmethod

# --- 1. Abstract Class & Abstraction ---
class LibraryItem(ABC):
    def __init__(self, item_id, title, year):
        self._item_id = item_id   # Protected attribute
        self._title = title       # Protected attribute
        self.year = year          # Public attribute

    @property
    def title(self):
        """Property decorator untuk akses atribut title (Encapsulation)"""
        return self._title

    @property
    def item_id(self):
        """Property untuk mengakses item id secara terenkapsulasi."""
        return self._item_id
    
    @title.setter
    def title(self, value):
        self._title = value

    @abstractmethod
    def get_info(self):
        """Abstract method yang wajib diimplementasi subclass"""
        pass

# --- 2. Inheritance & Polymorphism ---
class Book(LibraryItem):
    def __init__(self, item_id, title, year, author):
        super().__init__(item_id, title, year)
        self.__author = author  # Private attribute

    def get_info(self):
        return f"[Buku] {self._title} ditulis oleh {self.__author} ({self.year}) - ID: {self._item_id}"

    @property
    def author(self):
        return self.__author

    @author.setter
    def author(self, value):
        self.__author = value

class Magazine(LibraryItem):
    def __init__(self, item_id, title, year, edition):
        super().__init__(item_id, title, year)
        self.edition = edition

    def get_info(self):
        return f"[Majalah] {self._title} Edisi {self.edition} ({self.year}) - ID: {self._item_id}"

    @property
    def edition(self):
        return self._edition

    @edition.setter
    def edition(self, value):
        self._edition = value

# --- 3. Class Manager (Library) ---
class Library:
    def __init__(self):
        self.__items = []  # Private list (Encapsulation)

    def add_item(self, item: LibraryItem):
        self.__items.append(item)
        print(f"Sukses menambahkan: {item.title}")

    def show_items(self):
        print("\n--- Daftar Koleksi Perpustakaan ---")
        if not self.__items:
            print("Koleksi kosong.")
        for item in self.__items:
            print(item.get_info()) # Polymorphism berjalan di sini

    def search_item(self, keyword):
        print(f"\n--- Hasil Pencarian: '{keyword}' ---")
        found = False
        for item in self.__items:
            # Mencari berdasarkan ID atau Judul (Case insensitive)
            if keyword.lower() in item.title.lower() or str(item.item_id) == keyword:
                print(item.get_info())
                found = True
        
        if not found:
            print("Item tidak ditemukan.")

    def get_item_by_id(self, item_id):
        for item in self.__items:
            if item.item_id == item_id:
                return item
        return None

    def remove_item_by_id(self, item_id):
        item = self.get_item_by_id(item_id)
        if item:
            self.__items.remove(item)
            return True
        return False

    def update_item_by_id(self, item_id, **kwargs):
        item = self.get_item_by_id(item_id)
        if not item:
            return False
        # Update common attributes
        if 'title' in kwargs and kwargs['title'] is not None:
            item.title = kwargs['title']
        if 'year' in kwargs and kwargs['year'] is not None:
            try:
                item.year = int(kwargs['year'])
            except ValueError:
                pass
        # Update subclass-specific attributes
        if isinstance(item, Book) and 'author' in kwargs and kwargs['author'] is not None:
            item.author = kwargs['author']
        if isinstance(item, Magazine) and 'edition' in kwargs and kwargs['edition'] is not None:
            item.edition = kwargs['edition']
        return True

# --- Main Execution ---
if __name__ == "__main__":
    import sys

    def input_int(prompt, allow_empty=False):
        while True:
            val = input(prompt).strip()
            if allow_empty and val == '':
                return None
            try:
                return int(val)
            except ValueError:
                print("Masukkan angka yang valid.")

    def interactive_menu(lib: Library):
        while True:
            print("\n--- Menu Perpustakaan ---")
            print("1. Tambah item (Buku/Majalah)")
            print("2. Tampilkan semua item")
            print("3. Cari item (judul atau id)")
            print("4. Update item")
            print("5. Hapus item")
            print("6. Keluar")
            choice = input("Pilih opsi (1-6): ").strip()
            if choice == '1':
                tipe = input("Tipe item (buku/majalah): ").strip().lower()
                item_id = input_int("ID item (angka): ")
                if lib.get_item_by_id(item_id):
                    print("ID sudah ada. Gunakan ID lain.")
                    continue
                title = input("Judul: ").strip()
                year = input_int("Tahun terbit: ")
                if tipe == 'buku' or tipe == 'book':
                    author = input("Author: ").strip()
                    lib.add_item(Book(item_id, title, year, author))
                elif tipe == 'majalah' or tipe == 'magazine':
                    edition = input("Edisi: ").strip()
                    lib.add_item(Magazine(item_id, title, year, edition))
                else:
                    print("Tipe tidak dikenal.")
            elif choice == '2':
                lib.show_items()
            elif choice == '3':
                key = input("Masukkan judul atau id: ").strip()
                lib.search_item(key)
            elif choice == '4':
                item_id = input_int("ID item yang akan diupdate: ")
                item = lib.get_item_by_id(item_id)
                if not item:
                    print("Item tidak ditemukan.")
                    continue
                print("\n================== Update Items ==================")
                print("Biarkan kosong untuk tidak mengubah field tersebut.")
                new_title = input("Judul baru: ").strip() or None
                new_year = input("Tahun baru: ").strip() or None
                new_author = None
                new_edition = None
                if isinstance(item, Book):
                    new_author = input("Author baru: ").strip() or None
                if isinstance(item, Magazine):
                    new_edition = input("Edisi baru: ").strip() or None
                lib.update_item_by_id(item_id, title=new_title, year=new_year, author=new_author, edition=new_edition)
                print("Item berhasil diupdate.")
            elif choice == '5':
                item_id = input_int("ID item yang akan dihapus: ")
                if lib.remove_item_by_id(item_id):
                    print("Item dihapus.")
                else:
                    print("Item tidak ditemukan.")
            elif choice == '6':
                print("Keluar. Sampai jumpa!")
                break
            else:
                print("Pilihan tidak valid.")

    # create library and optionally run demo
    lib = Library()

    # If user passed --demo, run the original sample flow and exit (non-interactive)
    if '--demo' in sys.argv:
        buku1 = Book(101, "Python Basic", 2024, "Guido van Rossum")
        buku2 = Book(102, "Clean Code", 2008, "Robert C. Martin")
        majalah1 = Magazine(201, "Tech Asia", 2025, "Vol. 5")

        lib.add_item(buku1)
        lib.add_item(buku2)
        lib.add_item(majalah1)

        # Menampilkan Semua Item
        lib.show_items()

        # Mencari Item
        lib.search_item("Python")
        lib.search_item("201")
    else:
        # add some sample items for convenience
        lib.add_item(Book(101, "Python Basic", 2024, "Guido van Rossum"))
        lib.add_item(Book(102, "Clean Code", 2008, "Robert C. Martin"))
        lib.add_item(Magazine(201, "Tech Asia", 2025, "Vol. 5"))
        print("Sample data telah dimasukkan. Jalankan program dan pilih menu.")
        interactive_menu(lib)