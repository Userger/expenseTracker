import clsx from "clsx"
import { TransactionType } from "../../../hooks/useTransaction"
import { CloseButton } from "../../ui/close-button"
import classes from "./card.module.css"
import { GreenArrow } from "../../icons/GreenArrow"
import { RedArrow } from "../../icons/RedArrow"
import { Button } from "../../ui/button"
import { CurrencyElement } from "../currency/CurrencyElement"

export function HistoryItemCard({
    transaction,
}: {
    transaction?: TransactionType
}) {
    const formattedNum = Intl.NumberFormat().format(
        transaction ? transaction.num : 0
    )
    return (
        //TODO: добавить кнопку, чтобы снимать фокус с транзакции (крестик)
        //TODO: добавить функционал для мобильного (адаптив)
        <div className={classes.container}>
            <div className={classes.category}>
                {transaction ? transaction.category : "category"}
            </div>
            <div
                className={clsx(
                    classes.num,
                    transaction && transaction.num < 0 && classes.exp
                )}
            >
                {transaction ? (
                    <>
                        {transaction.num > 0 ? (
                            <>
                                <GreenArrow />+
                            </>
                        ) : (
                            <RedArrow />
                        )}
                        {formattedNum}
                        <CurrencyElement />
                    </>
                ) : (
                    <>
                        <CurrencyElement />
                        <CurrencyElement />
                        <CurrencyElement />
                    </>
                )}
            </div>
            <div className={classes.descr}>
                {transaction ? transaction.descr : "description..."}
            </div>
            <Button
                variant="bg"
                onClick={() => {}}
                className={classes.editButton}
            >
                Edit
            </Button>
        </div>
    )
}
