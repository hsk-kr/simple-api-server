import * as sqlite3 from "sqlite3";

const DB_FILE_PATH: string = "./db.sqlite3";
const TBL_ANALYZED_DATA: string = "naver_analyzed_data";

/**
 * Returns analyzed stocks that recorded on the date.
 * month | day : if the value less than 10, has to put '0' to the front of the value.
 */
export const fetchAnalyzedStocks = (
  year: string,
  month: string,
  day: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const db: any = new sqlite3.Database(DB_FILE_PATH, (err: any) => {
      if (err) {
        reject(err);
      }
    });

    db.serialize(() => {
      db.all(
        `
        SELECT * FROM ${TBL_ANALYZED_DATA} WHERE continuous_days >= 2 AND DATE(created_at) == '${year}-${month}-${day}';
        `,
        [],
        (err: any, rows: any) => {
          if (err) {
            reject(err);
          }

          resolve(rows);
        }
      );

      db.close((err: any) => {
        if (err) {
          reject(err);
        }
      });
    });
  });
};
