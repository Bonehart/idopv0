import redshift_connector
import numpy
import pandas as pd

conn = redshift_connector.connect(
    host='default.468209441303.us-east-1.redshift-serverless.amazonaws.com',
    port=5439,
    database='dev',
    user='admin',
    password='Derstaey9!'
 )

cursor = conn.cursor()

cursor.execute("""
           DROP TABLE IF EXISTS public.staging_events;
           
           
             
               """ 
               
               )

# cursor.execute("""
               
    
#               CREATE TABLE IF NOT EXISTS public.staging_events (
# 	artist varchar(256),
# 	auth varchar(256),
# 	firstName varchar(256),
# 	gender varchar(256),
# 	itemInsession integer,
# 	lastName varchar(256),
# 	length numeric(18,0),
# 	"level" varchar(256),
# 	location varchar(256),
# 	"method" varchar(256),
# 	page varchar(256),
# 	registration numeric(18,0),
# 	sessionId integer,
# 	song varchar(256),
# 	status integer,
# 	ts int8,
# 	userAgent varchar(256),
# 	userId integer
# );
              
              
              
#                """ 
               
#                )



conn.commit();

#result = cursor.fetchall()

 
# Convert result to DataFrame
#df = pd.DataFrame(result, columns=[desc[0] for desc in cursor.description])
#df.to_csv('/home/ncrowle/GIT/file.csv', index=False)

#print(df)
# Close the cursor and connection
cursor.close();
conn.close();