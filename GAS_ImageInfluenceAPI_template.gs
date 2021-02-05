//Googleドライブから画像ファイルを読み込み、後述のevaluateMeat関数に渡して、画像のスコアをログ出力する関数
function myfunction(){
  //Googleドライブから特定の画像を読み込む(********部分にファイルIDを指定)
  let imageData = DriveApp.getFileById("********").getBlob();
  //Image Influence APIにリクエストする関数から評価結果をログ出力する
  console.log(evaluateMaet(imageData));
}
//APIを利用するためのAPIキーをスクリプトプロパティに設定する関する
function setKeyToProperty(){
  //スクリプトプロパティにImage Influence APIのAPIKeyを設定する(++++++++部分にAPIKeyを指定)
  PropertiesService.getScriptProperties().setProperty("APIKEY","++++++++");
}
//引数に指定されたお肉の画像ファイル(Blob形式)をImage Influence APIにリクエストし、AIが判定したスコアを返却する関数
function evaluateMaet(meatImage) {
  //Image Influence APIのリクエストURLを設定する
  let apiURL = "https://api.a3rt.recruit-tech.co.jp/image_influence/v1/meat_score";
  //setKeyToProperty関数で設定したスクリプトプロパティからAPIキーを読み込む
  let apiKey = PropertiesService.getScriptProperties().getProperty("APIKEY");
  //APIのリクエストでPOSTデータするパラメーターを設定する
  let payload = {
    'apikey': apiKey,
    'predict':'1',
    'imagefile': meatImage,
  };
  //HTTP POSTで前述で設定したパラメーターをオプションで設定する
  let options = {
    'method' : 'post',
    'payload' : payload
  };
  //APIにリクエストし、返却されたデータをテキスト化して変数に格納する
  let res = UrlFetchApp.fetch(apiURL,options).getContentText();  
  //JSONデータをparseメソッドでオブジェクトに変換する
  let json = JSON.parse(res);
  //変換したオブジェクトデータからお肉のスコアデータを返却
  let meatScore = json["result"]["score"];
  return meatScore;
}
