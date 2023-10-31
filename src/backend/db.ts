import Database from "tauri-plugin-sql-api";

export class DbChunkBox {
  LEVEL_MAX: number = 7;

  private static instance: DbChunkBox;
  private static db: Database;

  constructor() {}

  public static async getInstance(): Promise<DbChunkBox> {
    if (!DbChunkBox.instance) {
      DbChunkBox.instance = new DbChunkBox();
      DbChunkBox.db = await Database.load("sqlite:test.db");
    }

    return DbChunkBox.instance;
  }

  async initSqlite(): Promise<void> {
    await DbChunkBox.db.execute(
      `CREATE TABLE IF NOT EXISTS boxs (
      id INTEGER PRIMARY KEY,
      title TEXT,
      review INTEGER,
      days INTEGER,
      learned INTEGER
     );
    `
    );

    await DbChunkBox.db.execute(`
    CREATE TABLE IF NOT EXISTS levels (
      id INTEGER PRIMARY KEY,
      box_id INTEGER,
      lvl INTEGER,
      FOREIGN KEY (box_id) REFERENCES boxs (id)
    );
  `);

    await DbChunkBox.db.execute(`CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY,
    level_id INTEGER,
    title TEXT,
    question TEXT,
    answer TEXT,
    date DATETIME,
    FOREIGN KEY (level_id) REFERENCES levels (id)
  );`);
  }

  async exec(cmd: string): Promise<void> {
    await DbChunkBox.db.execute(cmd);
  }

  async createBox(): Promise<void> {
    await DbChunkBox.db.execute(`INSERT INTO boxs (title, review, days, learned)
                     VALUES ('New Box', 0, 0, 0);`);

    // @ts-ignore
    const boxId: number = (
      await DbChunkBox.db.select(`SELECT last_insert_rowid();`)
    )[0]["last_insert_rowid()"];
    const promises: any = [];

    for (let i = 1; i < this.LEVEL_MAX + 1; i++) {
      promises.push(
        DbChunkBox.db.execute(
          `INSERT INTO levels (box_id, lvl) VALUES ($1, $2);`,
          [boxId, i]
        )
      );
    }
    Promise.all(promises);
  }

  async selectLevels(): Promise<[]> {
    return await DbChunkBox.db.select("Select * from levels");
  }

  async getBox(): Promise<[]> {
    return await DbChunkBox.db.select("SELECT * from boxs");
  }

  async getLevels(box_id: number): Promise<[]> {
    return await DbChunkBox.db.select(
      "SELECT * from levels where box_id = $1",
      [box_id]
    );
  }

  async updateBox(
    title: string,
    review = 0,
    days = 0,
    learned = 0,
    id: number
  ): Promise<void> {
    await DbChunkBox.db.execute(
      `UPDATE boxs
       SET
        title = $1,
        review = $2,
        days = $3,
        learned = $4
       WHERE id = $5;`,
      [title, review, days, learned, id]
    );
  }

  async updateBoxTilte(title: string, boxId: number): Promise<void> {
    await DbChunkBox.db.execute(
      `UPDATE boxs
       SET title = $1
       WHERE id = $2;`,
      [title, boxId]
    );
  }
}
export default DbChunkBox;
