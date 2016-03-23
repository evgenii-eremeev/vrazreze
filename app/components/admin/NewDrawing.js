import React, { PropTypes } from 'react';
import { Input, ButtonInput } from 'react-bootstrap';
import { connect } from 'react-redux';

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
                console.log(data);
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
                    style={{maxWidth: 500, margin: '0 auto', padding: '0 10px'}}
                    onSubmit={this.onNewDrawingSubmit}
                    >
                    <Input type="text" name="title" label="Название" required />
                    <Input type="select" name="category" label="Категория">
                        {this.props.categories.items.map((category, idx) => (
                            <option value={category.name} key={idx}>
                                {category.name}
                            </option>
                        ))}
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
});


function mapStateToProps(state) {
    return {
        categories: state.categories
    };
}


export default connect(mapStateToProps)(NewDrawing);
