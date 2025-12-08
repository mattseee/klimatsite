const mysql = require('mysql2/promise');
const { CATEGORY_TREE } = require('./categoryTree');

const connectionConfig = {
  host: '127.0.0.1',           // можно 'localhost'
  user: 'klimat_user',
  password: 'klimat_pass_123',
  database: 'klimat',
  charset: 'utf8mb4_general_ci',
};

async function updateNode(conn, node, parents = []) {
  const fullName = [...parents, node.name].join(' - ');

  const [result] = await conn.execute(
    'UPDATE categories SET slug = ? WHERE name = ?',
    [node.code, fullName]
  );

  console.log(`Updated: "${fullName}" -> ${node.code} (${result.affectedRows} rows)`);

  if (node.children) {
    for (const child of node.children) {
      await updateNode(conn, child, [...parents, node.name]);
    }
  }
}

async function main() {
  console.log('=== Slug updater started ===');

  const conn = await mysql.createConnection(connectionConfig);

  for (const root of CATEGORY_TREE) {
    if (root.children && root.children.length) {
      for (const child of root.children) {
        await updateNode(conn, child, []); // без "Климатическое оборудование"
      }
    } else {
      await updateNode(conn, root, []);
    }
  }

  await conn.end();
  console.log('=== Slug updater finished ===');
}

main().catch((err) => {
  console.error('ERROR:', err);
  process.exit(1);
});
