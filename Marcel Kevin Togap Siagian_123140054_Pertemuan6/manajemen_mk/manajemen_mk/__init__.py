from pyramid.config import Configurator

def main(global_config, **settings):
    with Configurator(settings=settings) as config:

        config.add_route('home', '/') 
        
        # Route API Matakuliah (Sudah Anda Tambahkan)
        config.add_route('matakuliah_collection', '/api/matakuliah')
        config.add_route('matakuliah', '/api/matakuliah/{id}')

        config.scan('.views') 
    return config.make_wsgi_app()