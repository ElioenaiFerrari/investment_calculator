use actix_cors::Cors;
use actix_files::Files;
use actix_web::{post, web, App, HttpResponse, HttpServer};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Debug, Deserialize)]
struct Req {
    pub investment: f64,
    pub monthly_income: f64,
    pub months: u32,
}

#[derive(Debug, Serialize)]
struct Res {
    pub predictions: Vec<Value>,
    pub total_dividend: f64,
    pub total: f64,
}

fn calculate_investment(investment: f64, monthly_income: f64, months: u32) -> Res {
    let mut res = Res {
        predictions: Vec::new(),
        total_dividend: 0.0,
        total: 0.0,
    };

    for i in 0..months {
        let dividend = monthly_income * (investment + res.total_dividend);
        res.total_dividend += dividend;

        let prediction = json!({
            "month": (i + 1),
            "dividend": dividend,
            "total": investment + res.total_dividend,
        });
        res.predictions.push(prediction);
    }

    res.total = investment + res.total_dividend;
    res
}

#[post("/calculate")]
async fn calculate(req: web::Json<Req>) -> HttpResponse {
    let res = calculate_investment(req.investment, req.monthly_income, req.months);
    HttpResponse::Ok().json(res)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(
                Cors::default()
                    .allow_any_header()
                    .allow_any_method()
                    .allow_any_origin(),
            )
            .service(Files::new("/", "./static").index_file("index.html"))
            .service(calculate)
    })
    .bind(("0.0.0.0", 4000))?
    .run()
    .await
}
