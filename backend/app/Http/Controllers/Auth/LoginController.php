<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'message' => ['The provided credentials are incorrect.'],
            ]);
        }

        $data['token'] = $user->createToken('appnap')->plainTextToken;
        $data['user']  = $user;
        return response($data, Response::HTTP_OK);
    }

    public function authCheck(Request $request)
    {
        return Auth::check();
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
