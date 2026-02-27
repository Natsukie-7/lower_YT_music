<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>@yield('title', 'Lower Youtube Music')</title>

    @vite([
        'resources/scss/index.scss',
        'resources/ts/main'
    ])

    @stack('styles')
</head>
<body>
    <div id="root">
        @yield('body')
    </div>

    @stack('scripts')
</body>
</html>