#define BUTTON_PIN 2  // Pause/Resume button on pin 2

int xyzPins[] = {39, 32, 33};   // Joystick X, Y, and switch pins
bool isPaused = false;

void setup() {
  Serial.begin(9600);
  pinMode(xyzPins[2], INPUT_PULLUP);  // Joystick switch (Z)
  pinMode(BUTTON_PIN, INPUT_PULLUP);  // Pause/Resume button
}

void loop() {
  int xVal = analogRead(xyzPins[0]);
  int yVal = analogRead(xyzPins[1]);
  int zVal = digitalRead(xyzPins[2]);
  int buttonVal = digitalRead(BUTTON_PIN);

  // Determine movement based on joystick
  String movement = "";
  if (xVal < 1000) {
    movement = "left";
  } else if (xVal > 3000) {
    movement = "right";
  } else if (yVal < 1000) {
    movement = "up";
  } else if (yVal > 3000) {
    movement = "down";
  }

  // Send movement or game control commands
  if (zVal == LOW) {
    Serial.println("restart");
  } else if (buttonVal == LOW && !isPaused) {
    Serial.println("pause");
    isPaused = true;
  } else if (buttonVal == LOW && isPaused) {
    Serial.println("resume");
    isPaused = false;
  } else if (movement != "") {
    Serial.println(movement);
  }

  delay(100);
}
