import { Button } from "@/components/ui/button";
import {  Select,  SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";

const types = {
    Inputs : 'inputs',
    Select : 'select',
    TextArea : 'textarea'
}

// commonform component used by the other when they needed it (no need to create again and again. this will used every time).
const CommonForm = ({formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled}) => {
    function renderInputByComponentType(getControlItem){
        let element = null;
        const value = formData[getControlItem.name] || '';

        // switch for cheacking which type of iput does the form wants and passing all its required parameters
        switch(getControlItem.componentType){

            //for inputs
            case types.Inputs :
                element = (
                <input 
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type} 
                    className="border"
                    value={value}
                    onChange={(event)=>
                        setFormData({
                            ...formData,
                            [getControlItem.name] : event.target.value
                        })
                    }
                />
                );
            break;

            //for select type options
            case types.Select :
                element = (
                <Select onValueChange={(value)=>setFormData({
                    ...formData,
                    [getControlItem.name] : value
                })} value={value}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={getControlItem.label}></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.options && 
                            getControlItem.options.length > 0 ?
                            getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) : null
                        }
                    </SelectContent>
                </Select>
                );
            break;

            //for texterea
            case types.TextArea:
                element = (
                <Textarea
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    value={value}
                    onChange={(event)=>
                        setFormData({
                            ...formData,
                            [getControlItem.name] : event.target.value
                        })
                    }
                />
                );
            break;

            //if nothing from above is selected then this will be send as response
            default :
                element = (
                <input 
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type} 
                    value={value}
                    className="border border-black py-1 rounded-sm px-2"
                    onChange={(event)=>
                        setFormData({
                            ...formData,
                            [getControlItem.name] : event.target.value
                        })
                    }
                />
                );
            break;
        }
        return element;
    }
  return (
    <form onSubmit={onSubmit}>
        <div>
            {
                formControls.map(controlItem => 
                    <div key={controlItem.name} className='grid  w-full gap-1.5'>
                        <label className='mb-1'>{controlItem.label}</label>
                        {
                            renderInputByComponentType(controlItem)
                        }
                    </div>)
            }
        </div>
        <Button type="submit" className="mt-2 w-full" disabled={isBtnDisabled}>{buttonText || 'submit'}</Button>
    </form>
  )
}

export default CommonForm





// 03:23:36