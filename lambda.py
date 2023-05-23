import json
import boto3
import pandas as pd
import numpy as np

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = 'Materials_Data'  # Reemplaza con el nombre de tu tabla de DynamoDB
    
    # Leer datos de la tabla de DynamoDB y convertirlos a un DataFrame
    table = dynamodb.Table(table_name)
    response = table.scan()
    items = response['Items']
    df = pd.DataFrame(items)
    
    # Obtener los rangos de E y Ro de los parámetros de consulta
    rango_min_E = str(event['queryStringParameters']['minE'])
    rango_max_E = str(event['queryStringParameters']['maxE'])
    rango_min_Ro = str(event['queryStringParameters']['minRo'])
    rango_max_Ro = str(event['queryStringParameters']['maxRo'])
    
    # Convertir columnas 'Sy' y 'A5' a valores numéricos
    df['Sy'] = pd.to_numeric(df['Sy'], errors='coerce')
    df['A5'] = pd.to_numeric(df['A5'], errors='coerce')
    
    # Aplicar filtros en función de los rangos
    materiales_seleccionados = df[(df['E'] >= rango_min_E) & (df['E'] <= rango_max_E) & (df['Ro'] >= rango_min_Ro) & (df['Ro'] <= rango_max_Ro)]
    
    if len(materiales_seleccionados) == 0:
        response_body = 'No se encontraron materiales que cumplan con los rangos especificados.'
        status_code = 404
    else:
        # Calcular la relación Sy/A5 y seleccionar los 5 con menor relación
        materiales_seleccionados['Sy/A5'] = materiales_seleccionados['Sy'] / materiales_seleccionados['A5']
        materiales_ordenados = materiales_seleccionados.sort_values('Sy/A5').head(5)
        materiales_json = materiales_ordenados.to_dict(orient='records')
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
