import { useState, useEffect } from "react";
import { RadioGroup } from '@headlessui/react'
import axios from "axios";
import "./input.css"; //./styles.css";
//import "./App.css"; //./styles.css";
import Image from './sample1.png';

export default function Example() {
  //console.log("〜〜〜初期処理〜〜〜");
  //APIのURL
  const urlAPI = "https://api-test-jp.protosure.io/api/rater/active/calculate_data/";
  //httpヘッダの設定（認証情報が必要）
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token 40ad7c84966635d79b25ccc21b17ae48519671c3'
     };
  //画面入力値想定のパラメータ
  //サンプルのエクセルファイルに合わせて２つ（後で修正が必要）
  const [param3, setParam3] = useState(1) //10;
  const [param1, setParam1] = useState(1) //"G1";
  const [param2, setParam2] = useState(1) //10;
  const [param4, setParam4] = useState(1) //10;
  const [resultTxt, setResultTxt] = useState(""); //住所
  const [resultTx2, setResultTx2] = useState(""); //住所
  //const [clickSt, setClickSt] = useState(0);
  //画面入力値想定のパラメータ
  //const ParentCode = "1"; //1（父親）,2（母親）
  //const AgeCode = "1"; //1（18-29歳）,2（30-39歳）,3（40-49歳）
  //const ChildCode = "1"; //1（1人）,2（2人）,3（3人）4（4人）,5（5人）
  //const PlanCode = "1"; //1（おてがる）,2（基本）,3（基本）

  useEffect(() => {
    //console.log("〜〜〜クリック時〜〜〜");
    //post時にawaitキーワードを使う場合は、async関数にラップする必要あり
    async function postData(){
        console.log("〜〜〜param3の値確認〜〜〜");
        console.log(param3);
        console.log("〜〜〜param1の値確認〜〜〜");
        console.log(param1);
        console.log("〜〜〜param2の値確認〜〜〜");
        console.log(param2);
        console.log("〜〜〜param4の値確認〜〜〜");
        console.log(param4);
        const inputData = { 
        "data": {
          "input_Parent_Code": param3,
          "input_Age_Code": param1,
          "input_Child_Code": param2,
          "input_Plan_Code": param4
        }
      }
      //APIへの通信
      try {
        //post
        const res = await axios.post(urlAPI, inputData, {headers: headers});
        console.log("〜〜〜APIからの返り値〜〜〜");
        console.log(res.data);
        console.log("〜〜〜output_premiumの値〜〜〜");
        console.log(res.data.output_premium);
        //ここに処理を追加していけば良さそうかも？
        console.log("〜〜〜setResultTxt start 〜〜〜");
        setResultTxt(res.data.output_premium);
        setResultTx2(res.data.output_premium + 1748);
        console.log("〜〜〜setResultTxt end 〜〜〜");
      } catch (error) {
        //ここは定数を返すようにコーディングしてもいいかも
        console.error(error);
      }
    }
    //APIとの通信
    //if (param1 !== "" && param2 !== 0 && clickSt === 1) {
    postData();
    //  setClickSt(0);
    //}
  }); /// zipの値が更新されたら実行
  // 検索をクリックした時
  const onClickGetArea = () => {
    console.log("検索をクリックしました");
    // 未入力だったらアラートを表示
    //setClickSt(1);
  };
  const inputStyle = {
    border: "1px solid #ccc",
    padding: "5px 10px",
    borderRadius: "4px",
    marginRight: "10px"
  };
  const h1Style = {
    fontSize: "1.2em",
    color: "#B09851",
    background: "#E9E1C8",
    padding: "5px 10px"
  };

  return (
    <div className="w-full px-4 py-16">
      <p><img src={Image} alt="Image" /></p>
      <br />
      <p>
        <h1 style={h1Style}>ママ？パパ？</h1>
        <div>
          <form name="form1">
          <select id="sex" value={param3} onChange={(e) => setParam3(e.target.value)}>
            <option value="1" selected>ママ！</option>
            <option value="2">パパ！</option>
          </select>
          </form>
        </div>
      </p>
      <br />
      <p>
        <h1 style={h1Style}>年齢</h1>
        <div>
          <form name="form2">
          <select id="age" value={param1} onChange={(e) => setParam1(e.target.value)}>
            <option value="1" selected>18歳〜29歳</option>
            <option value="2">30歳〜39歳</option>
            <option value="3">40歳〜49歳</option>
          </select>
          </form>
        </div>
      </p>
      <br />
      <p>
        <h1 style={h1Style}>子供の人数</h1>
        <div>
          <form name="form3">
          <select id="chi" value={param2} onChange={(e) => setParam2(e.target.value)}>
            <option value="1" selected>1人</option>
            <option value="2">2人</option>
            <option value="3">3人</option>
            <option value="4">4人</option>
            <option value="5">5人</option>
          </select>
          </form>
        </div>
      </p>
      <br />
      <p>
        <h1 style={h1Style}>プラン選択</h1>
        <div>
          <form name="form4">
          <select id="pln" value={param4} onChange={(e) => setParam4(e.target.value)}>
            <option value="1" selected>おてがるプラン</option>
            <option value="2">すくすくプラン</option>
            <option value="3">モリモリプラン</option>
          </select>
          </form>
        </div>
      </p>
      <br />
      <div>
      <br />
      <h1 style={h1Style}>ゆりかご価格</h1>
      <p>
        <br />
      </p>
      <p>{resultTxt}</p>
      <p>{resultTx2}</p>
      <p>
        <br />
      </p>
      <button onClick={onClickGetArea}>***** ***** ご購入 ***** *****</button>
    </div>
 
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}