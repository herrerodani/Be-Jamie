// This #include statement was automatically added by the Particle IDE.
#include "SparkJson/SparkJson.h"

// This #include statement was automatically added by the Particle IDE.
#include "MQTT/MQTT.h"

// This #include statement was automatically added by the Particle IDE.
#include "LiquidCrystal_I2C_Spark/LiquidCrystal_I2C_Spark.h"

/*************************************************** 
  This is a library example for the MLX90614 Temp Sensor

  Designed specifically to work with the MLX90614 sensors in the
  adafruit shop
  ----> https://www.adafruit.com/products/1748
  ----> https://www.adafruit.com/products/1749

  These sensors use I2C to communicate, 2 pins are required to  
  interface
  Adafruit invests time and resources providing this open source code, 
  please support Adafruit and open-source hardware by purchasing 
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.  
  BSD license, all text above must be included in any redistribution
 ****************************************************/
 
// This #include statement was automatically added by the Particle IDE.
#include "Adafruit_MLX90614/Adafruit_MLX90614.h"

Adafruit_MLX90614 mlx = Adafruit_MLX90614();

double tempC = 0;
double tempT= 0;

LiquidCrystal_I2C *lcd;

//-------- Customise these values -----------
#define ORG "djf26u"
#define DEVICE_TYPE "IntelliKitchen"
#define DEVICE_ID "Test1"
#define TOKEN "03MDtol*7cSCwbzB5-"
//-------- Customise the above values --------

//char server[] = "djf26u.messaging.internetofthings.ibmcloud.com";
char server[] = "test.mosquitto.org";
//char topic[] = "iot-2/evt/status/fmt/json";
char topic[] = "intellikitchen";
char authMethod[] = "use-token-auth";
//char token[] = "03MDtol*7cSCwbzB5-";
//char clientId[] = "d:djf26u:IntelliKitchen:Test1";
char clientId[] = "test1";

MQTT client(server, 1883, callback);
//PubSubClient client(server, 1883, callback, wifiClient);

// recieve message
void callback(char* topic, byte* payload, unsigned int length) {
}

// Define which analog input pin we have connected to the temperature sensor
#define TEMP_SENSOR_PIN 0

// if you tie the Arduino's vRef to the 3.3 volt supply, change this to 3.3
#define ANALOG_VOTLAGE_REFERENCE 3.3

void setup() {
  Serial.begin(9600);

  Serial.println("Adafruit MLX90614 test");  

  lcd = new LiquidCrystal_I2C(0x27, 16, 2);
  lcd->init();
  lcd->backlight();
  lcd->clear();
  lcd->print("***Are you hot?***");

  mlx.begin();
  
  Spark.variable("temp", &tempC, DOUBLE);
  Spark.variable("thermo", &tempT, DOUBLE);
  
  // connect to the server
  //client.connect(clientId, authMethod, token);
  client.connect(clientId);

  // publish/subscribe
  /*if (client.isConnected()) {
    //client.publish("/outTopic","hello world");
    //client.subscribe("/inTopic");
    Serial.println("Is connected!");
  }*/
}

void loop() {
  tone(4, 404, 1000);
    
  if (!!!client.isConnected()) {
    Serial.print("Reconnecting client to ");
    Serial.println(server);
    while (!!!client.connect(clientId)) {
    //while (!!!client.connect(clientId, authMethod, token)) {
      Serial.print(".");
      delay(500);
      //client.loop();
   }
   Serial.println();
 } 
    
  Serial.print("Ambient = "); Serial.print(mlx.readAmbientTempC()); 
  Serial.print("*C\tObject = "); Serial.print(mlx.readObjectTempC()); Serial.println("*C");
  Serial.print("Ambient = "); Serial.print(mlx.readAmbientTempF()); 
  Serial.print("*F\tObject = "); Serial.print(mlx.readObjectTempF()); Serial.println("*F");

  Serial.println();
  
  //String objectTempC = String(mlx.readObjectTempC(), 2);
  //Spark.publish("Boiling!", objectTempC);
  
  tempC = mlx.readObjectTempC();
  tempT = analogInToDegreesC(analogRead(TEMP_SENSOR_PIN));
  
  lcd->setCursor(0,1);
  lcd->print(tempC);
  lcd->print("  ");
  lcd->print(tempT);
  
  StaticJsonBuffer<200> jsonBuffer;

  JsonObject& root = jsonBuffer.createObject();
  root["sensor"] = "Test1";
  root["temp"] = tempC;
  root["tempT"] = tempT;
    
  char buffer[256];
  root.printTo(buffer, sizeof(buffer));
  
  root.printTo(Serial);
  
  if (client.publish(topic, buffer)) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }
  
  delay(1000);
}

float analogInToDegreesC(int inputValue) {
    // divide by 1023, the maximum possible input value, that scales the input between 0 - 1
    // then multiply by the reference voltage, which scales 0-1 to 0-vREF (default is 5V)
    // lastly, multiply by 100 to scale it to 10s of millivolts or degrees
    return inputValue / 4095.0 * ANALOG_VOTLAGE_REFERENCE * 100.0;
}
