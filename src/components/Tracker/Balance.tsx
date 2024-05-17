export function Balance({ balance }: { balance: number }) {
  const formattedBalance = Intl.NumberFormat().format(balance);
  return (
    <div>
      <h4>Your balance</h4>
      <h1 id="balance">${formattedBalance}</h1>
    </div>
  );
}
