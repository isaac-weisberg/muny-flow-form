import { FixedStatementField } from './FixedStatementField'
import { useStatementIncomeTable } from "./useStatementIncomeTable";

export function App() {
    const dividends = useStatementIncomeTable('statement/income/dividends')

    return <div>
        <h2>Доходы</h2>
        <FixedStatementField title="Зарплата" />
        <h2>Расходы</h2>
        <div>
            { 
                dividends.entries.map(dividend => {
                    return <div key={dividend.id}>
                        Name: { dividend.name } 
                        <input 
                            type="text" 
                            placeholder="Дивиденд" 
                            value={dividend.name} 
                            onChange={e => dividends.setEntryName(dividend.id, e.target.value)}
                        />
                        Value: { dividend.value || "nil" } 
                        <input
                            type="number"
                            placeholder="0" 
                            inputMode="numeric"
                            value={dividend.value || ""} 
                            onChange={e => dividends.setEntryValue(dividend.id, e.target.value)}
                        />
                    </div>
                }) 
            }
            <input type="button" value="Добавить дивиденд" onClick={dividends.addNewEntry} />
            <input type="button" value="Убрать лишнее" onClick={dividends.pruneEntries} />
        </div>
    </div>
}