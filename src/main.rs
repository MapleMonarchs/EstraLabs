use std::env;
use std::path::Path;

#[async_std::main]

async fn main() -> Result<(), std::io::Error> {
    femme::start();
    let mut path = env::current_exe()?;

    let mut index_path = path.join("..").join("..").join("..").join("html").join("index.html");

    let mut app = tide::new();
    
    app.with(tide::log::LogMiddleware::new());

    println!("{}", path.display());

    app.at("/").serve_file(index_path);

    app.at("/test/").get(|_| async {Ok("test!")});

    app.listen("127.0.0.1:8080").await?;
    Ok(())
}