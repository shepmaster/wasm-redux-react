use wasm_bindgen::prelude::*;
use futures::{channel::mpsc, SinkExt, StreamExt};

#[wasm_bindgen]
struct Application {
    state: i32,
    tx: mpsc::Sender<()>,
    rx: Option<mpsc::Receiver<()>>,
}

#[wasm_bindgen]
impl Application {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        let (tx, rx) = mpsc::channel(5);
        Self { state: 0, tx, rx: Some(rx) }
    }

    #[wasm_bindgen]
    pub fn events(&mut self) -> Option<Events> {
        self.rx.take().map(Events)
    }

    pub async fn increment(&mut self) {
        self.state += 1;
        if self.state % 5 == 0 {
            self.tx.send(()).await.unwrap();
        }
    }
}

#[wasm_bindgen]
pub struct Events(mpsc::Receiver<()>);

#[wasm_bindgen]
impl Events {
    pub async fn next(&mut self) -> Event {
        self.0.next().await;
        Event { name: "counter/setHighlight".into(), payload: true }
    }
}

#[wasm_bindgen]
pub struct Event {
    name: String,
    pub payload: bool,
}

#[wasm_bindgen]
impl Event {
    #[wasm_bindgen(getter)]
    pub fn name(&self) -> String {
        self.name.clone()
    }
}
