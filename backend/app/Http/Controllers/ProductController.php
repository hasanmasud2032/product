<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\StoreProductRequest;
use App\Http\Requests\Task\UpdateProductRequest;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category:id,name')->get(['id','name','price','category_id']);
        return response()->json($products, 200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        Product::create($request->validated());

        return response()->json('Product added successfully',201);
    }

    public function show(Product $product)
    {
       return response($product, 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        return response()->json('Product Updated successfully',201);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json('Product Deleted successfully',200);
    }
}
