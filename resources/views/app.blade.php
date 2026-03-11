@extends('templates.basic')

@section('title', 'Lower yt music')

@push('scripts')
    <script>
        window.__APP__ = @json([
            'csrf' => csrf_token()
        ]);
    </script>

    @vite('resources/solid')
@endpush
