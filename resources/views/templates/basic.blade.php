<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>@yield('title')</title>

    @vite([
        'resources/scss/index.scss',
        'resources/ts/main'
    ])

    @stack('styles')
</head>
<body>
    <div id="root">
        @yield('root')
    </div>
    
    @stack('scripts')
</body>
</html>