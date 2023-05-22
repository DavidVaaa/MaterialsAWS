import json
import boto3
import pandas as pd

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = 'Materials_Data'  # Reemplaza con el nombre de tu tabla de DynamoDB
    
    # Leer datos de la tabla de DynamoDB y convertirlos a un DataFrame
    table = dynamodb.Table(table_name)
    response = table.scan()
    items = response['Items']
    df = pd.DataFrame(items)
    
    # Obtener los rangos de E y Ro del evento
    rango_min_E = event['E'][0]
    rango_max_E = event['E'][1]
    rango_min_Ro = event['Ro'][0]
    rango_max_Ro = event['Ro'][1]
    
    # Aplicar filtros en función de los rangos
    materiales_seleccionados = df[(df['E'] >= rango_min_E) & (df['E'] <= rango_max_E) & (df['Ro'] >= rango_min_Ro) & (df['Ro'] <= rango_max_Ro)]
    
    if len(materiales_seleccionados) == 0:
        response_body = 'No se encontraron materiales que cumplan con los rangos especificados.'
        status_code = 404
    else:
        materiales_json = materiales_seleccionados.to_dict(orient='records')
        response_body = json.dumps(materiales_json)
        status_code = 200
    
    response = {
        'statusCode': status_code,
        'body': response_body,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'  # Permitir el acceso desde cualquier origen. Puedes ajustarlo según tus necesidades.
        }
    }
    
    return response
