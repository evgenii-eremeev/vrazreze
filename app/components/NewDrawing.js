import React, { PropTypes } from 'react';
import { Input, ButtonInput } from 'react-bootstrap';

const NewDrawing = React.createClass({

    onNewDrawingSubmit (e) {
        e.preventDefault();
        let form = document.getElementById('newDrawingForm');
        let formData = new FormData(form);

        $.ajax({
            url: '/new_drawing',
            type: 'POST',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("Submitted!");
                form.reset();
            },
            error: function (xhr, message, err) {
                console.error(err);
            }
        });
    },

    render () {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Новый чертеж</h1>
                <br />
                <form role='form'
                    id="newDrawingForm"
                    method='post'
                    enctype="multipart/form-data"
                    style={{maxWidth: 500, margin: '0 auto'}}
                    onSubmit={this.onNewDrawingSubmit}
                    >
                    <Input type="text" name="title" label="Название" required />
                    <Input type="select" name="category" label="Категория">
                        <option value="Прочее">Прочее</option>
                        <option value="Машиностроение">Машиностроение</option>
                        <option value="Сельское хозяйство">Сельское хозяйство</option>
                        <option value="Промышленность">Промышленность</option>
                        <option value="Строительство">Строительство</option>
                        <option value="Схемы">Схемы</option>
                        <option value="Транспорт">Транспорт</option>
                        <option value="Станки">Станки</option>
                    </Input>
                    <Input type="textarea"
                        name="description"
                        label="Описание"
                        rows={4}
                        required />
                    <Input type="text" name="drawing_composition" label="Состав работы"/>
                    <Input type="number" name="price" label="Цена" />
                    <Input type="text" name="tags" label="Ключевые слова" />
                    <Input type="file" name="picture" label="Изображение" help="Форматы: .jpg .png .gif" />
                    <ButtonInput type="submit" value="Добавить" bsStyle="primary" />
                </form>
            </div>
        );
    }
})

export default NewDrawing;
