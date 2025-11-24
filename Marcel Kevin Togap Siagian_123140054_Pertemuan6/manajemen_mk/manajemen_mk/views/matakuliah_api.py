from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete, update, insert
import json
from ..models.matakuliah import Matakuliah 

# Fungsi untuk mendapatkan data JSON dari request body
def get_json_data(request):
    try:
        return request.json_body
    except json.JSONDecodeError:
        return None

# Helper untuk mengembalikan Response Error
def error_response(message, status):
    return Response(json.dumps({'success': False, 'message': message}), 
                    status=status, content_type='application/json')

# --------------------------
# A. GET ALL & POST (Collection)
# --------------------------
@view_config(route_name='matakuliah_collection', renderer='json', request_method='GET')
def get_all_matakuliah(request):
    """Mendapatkan semua matakuliah: GET /api/matakuliah"""
    matakuliah_list = request.dbsession.scalars(select(Matakuliah)).all()
    
    return {'matakuliahs': [mk.to_dict() for mk in matakuliah_list]}

@view_config(route_name='matakuliah_collection', renderer='json', request_method='POST')
def create_matakuliah(request):
    """Menambahkan matakuliah baru: POST /api/matakuliah"""
    data = get_json_data(request)

    if not data or not all(k in data for k in ('kode_mk', 'nama_mk', 'sks', 'semester')):
        return error_response('Data tidak lengkap atau format salah.', 400)

    try:
        new_mk = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=int(data['sks']),
            semester=int(data['semester'])
        )
        request.dbsession.add(new_mk)
        request.dbsession.flush() # Mendapatkan ID
        
        return {'success': True, 'matakuliah': new_mk.to_dict()}
    
    except IntegrityError:
        return error_response('Kode matakuliah sudah ada (unique constraint violated).', 409)
    except ValueError:
        return error_response('SKS dan Semester harus berupa bilangan bulat.', 400)
    except Exception as e:
        return error_response(f'Terjadi kesalahan server: {str(e)}', 500)


# --------------------------
# B. GET, PUT, DELETE (Single Resource)
# --------------------------
@view_config(route_name='matakuliah', renderer='json', request_method='GET')
def get_matakuliah(request):
    """Mendapatkan detail satu matakuliah: GET /api/matakuliah/{id}"""
    try:
        mk_id = int(request.matchdict['id'])
    except ValueError:
        return error_response('ID harus berupa bilangan bulat.', 400)
    
    matakuliah = request.dbsession.get(Matakuliah, mk_id)
    
    if matakuliah is None:
        return error_response('Matakuliah tidak ditemukan.', 404)
    
    return {'matakuliah': matakuliah.to_dict()}

@view_config(route_name='matakuliah', renderer='json', request_method='PUT')
def update_matakuliah(request):
    """Mengupdate data matakuliah: PUT /api/matakuliah/{id}"""
    try:
        mk_id = int(request.matchdict['id'])
    except ValueError:
        return error_response('ID harus berupa bilangan bulat.', 400)

    matakuliah = request.dbsession.get(Matakuliah, mk_id)
    if matakuliah is None:
        return error_response('Matakuliah tidak ditemukan.', 404)
    
    data = get_json_data(request)
    if not data:
        return error_response('Body request tidak valid.', 400)

    try:
        # Update fields yang disediakan
        if 'kode_mk' in data:
            matakuliah.kode_mk = data['kode_mk']
        if 'nama_mk' in data:
            matakuliah.nama_mk = data['nama_mk']
        if 'sks' in data:
            matakuliah.sks = int(data['sks'])
        if 'semester' in data:
            matakuliah.semester = int(data['semester'])

        request.dbsession.flush()
        return {'success': True, 'matakuliah': matakuliah.to_dict()}

    except IntegrityError:
        return error_response('Kode matakuliah sudah digunakan (unique constraint violated).', 409)
    except ValueError:
        return error_response('SKS/Semester harus berupa bilangan bulat.', 400)
    except Exception as e:
        return error_response(f'Terjadi kesalahan server: {str(e)}', 500)

@view_config(route_name='matakuliah', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    """Menghapus data matakuliah: DELETE /api/matakuliah/{id}"""
    try:
        mk_id = int(request.matchdict['id'])
    except ValueError:
        return error_response('ID harus berupa bilangan bulat.', 400)
        
    matakuliah = request.dbsession.get(Matakuliah, mk_id)
    
    if matakuliah is None:
        return error_response('Matakuliah tidak ditemukan.', 404)

    request.dbsession.delete(matakuliah)

    return {'success': True, 'message': f'Matakuliah dengan ID {mk_id} berhasil dihapus.'}