import fs from 'fs';
import path from 'path';

const filePath = path.resolve('static/products.json');

// Hàm đọc file JSON
function readProducts() {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// Hàm ghi file JSON
function writeProducts(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Lấy danh sách sản phẩm
export async function GET() {
  const products = readProducts();
  return new Response(JSON.stringify(products), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Thêm sản phẩm (client gửi 1 object)
export async function POST({ request }) {
  const newProduct = await request.json();
  const products = readProducts();

  newProduct.id = Date.now(); // tạo id
  products.push(newProduct);
  writeProducts(products);

  return new Response(JSON.stringify({ success: true, product: newProduct }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Cập nhật sản phẩm (client gửi full object có id)
export async function PUT({ request }) {
  const updatedProduct = await request.json();
  const products = readProducts();

  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
    writeProducts(products);
    return new Response(JSON.stringify({ success: true }));
  }
  return new Response(JSON.stringify({ success: false, message: 'Not found' }), { status: 404 });
}

// Xóa sản phẩm theo id
export async function DELETE({ request }) {
  const { id } = await request.json();
  let products = readProducts();
  products = products.filter(p => p.id !== id);
  writeProducts(products);

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}