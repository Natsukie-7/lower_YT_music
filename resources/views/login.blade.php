@extends('templates.basic')

@section('title', 'Login')

@section('body')
    <h1>Login</h1>

    <form id="login-form">
        @CSRF
        <input type="email" name="email" placeholder="Email">
        <input type="password" name="password" placeholder="Senha">
        <button type="submit">Entrar</button>
    </form>
@endsection

@push('scripts')
    @vite('resources/ts/login')
@endpush