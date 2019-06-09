# lottery
The lottery using a Blockchain.

## dapps
This is a project of a smart contract. We use Truffle and Solidity.

## frontend
This is a project of a front web application. We use Nuxt.js.

# Function/Rules

1. 購入プロセス(2週間程度)

決められた価格でユーザはチケットを購入することができます。

・チケットは一度に一枚のみ
・ユーザは購入時に1-5000番のうち好きなチケットを選んで購入する
・チケット番号とアドレスをハッシュ化してコントラクトに格納する（チケット番号でハックされる可能性がある場合は別途番号を入力してもらうよう変更）
・購入期間を過ぎた場合はチケットを購入できない

2. 公表プロセス(1週間程度)

チケット番号をユーザに確認してもらい、複数人ユーザによる実質変更不能なシードを作成します。

・公表期間中にチケット番号を入力することで宝くじへの参加受付が完了
・チケット番号と公表処理順番によって予測不可能なシードに更新されてゆく
・公表期間中に公表プロセスを完了しなかったユーザは当選対象から除外

3. 当選プロセス(1週間程度)

実質ランダム値であるシードから数値に生成し、5000で除した余りを当選番号とします。
チケット番号5000枚に対してランダムに番号が決定するため、以下３タイプに分類されます。

①未洗濯番号の場合

->今回の当選者はなし。次回の購入期間では今回選択された番号を除いてユーザは数値を選択購入します。

②今回当選番号

->該当のユーザは10000ETHを獲得する権利が与えられます。チケット5000枚のステータスは全て初期化されます。ユーザは当選プロセス期間中に自身の当選額を引き出す処理を自主的に行います。

③前回当選番号

->当選番号に+1をして再度当選番号を決定します。①or②になるまで繰り返し、5000番の次は1に戻りインクリメントを繰り返します。
