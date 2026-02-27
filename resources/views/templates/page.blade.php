@extends('layouts.basic')

@section('body')
    <header>
        <nav>
            <a href="{{ route('home') }}">Home</a>
        </nav>
    </header>

    <main>
        @yield('content')
    </main>

    <footer>
        <p>&copy; {{ date('Y') }} - Lower Youtube Music</p>
    </footer>
@endsection