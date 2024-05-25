import { useOpenForm } from '../../store/formOpened'

export function EmptyList() {
    const { formOpened } = useOpenForm()
    return (
        <div className="tracker-emptyList">
            empty list...
            {formOpened ? '' : <div className="tracker-arrow">↓</div>}
        </div>
    )
}
