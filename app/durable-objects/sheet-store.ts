import { DurableObject } from "cloudflare:workers";

export class SheetStore extends DurableObject {
  isInited = false;
  constructor(ctx: DurableObjectState, env: Env) {
    // Required, as we're extending the base class.
    super(ctx, env);
  }

  private init() {
    if (this.isInited) {
      return;
    }
    // Create the table with version as primary key, created_at with an index, and data as JSON
    this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS versions (
        version INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data JSON
      );
      CREATE INDEX IF NOT EXISTS idx_created_at ON versions(created_at);
    `);
    this.isInited = true;
    return { success: true };
  }

  saveData(jsonData: any) {
    this.init();
    // Insert the new data
    this.ctx.storage.sql.exec("INSERT INTO versions (data) VALUES (?)", [
      JSON.stringify(jsonData),
    ]);

    // Check if we have more than 100 versions
    const countResult = this.ctx.storage.sql
      .exec("SELECT COUNT(*) as count FROM versions")
      .one();

    // If more than 100 versions, delete the oldest ones
    if (countResult.count && (countResult.count as number) > 100) {
      const deleteCount = (countResult.count as number) - 100;
      this.ctx.storage.sql.exec(
        "DELETE FROM versions WHERE version IN (SELECT version FROM versions ORDER BY version ASC LIMIT ?)",
        [deleteCount]
      );
    }

    return { success: true };
  }

  listVersions() {
    this.init();
    // List all versions with their created_at times
    const versions = this.ctx.storage.sql
      .exec("SELECT version, created_at FROM versions ORDER BY version DESC")
      .toArray();

    return versions;
  }

  getLatestData(): any {
    this.init();
    // Get the data from the latest version
    const latest = this.ctx.storage.sql
      .exec(
        "SELECT data, created_at FROM versions ORDER BY version DESC LIMIT 1"
      )
      .toArray();

    // If no versions exist, return null
    if (!latest || latest.length === 0) {
      return null;
    }

    // Parse the JSON data before returning
    return {
      ...JSON.parse(latest[0].data as string),
      lastSaved: latest[0].created_at,
    };
  }
}
