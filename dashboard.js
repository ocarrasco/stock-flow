$(document).ready(function() {
    let products = [
        { sku: 'PROD-001', name: 'Laptop Pro 15', category: 'Electrónica' },
        { sku: 'PROD-002', name: 'Silla Ergonómica', category: 'Mobiliario' }
    ];

    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    function renderTable() {
        const tbody = $('#productsTable tbody');
        tbody.empty();
        
        if (products.length === 0) {
            tbody.append(`<tr><td colspan="4" class="text-center text-muted py-4">No hay productos registrados.</td></tr>`);
            return;
        }

        products.forEach((prod, index) => {
            tbody.append(`
                <tr>
                    <td class="fw-bold">${prod.sku}</td>
                    <td>${prod.name}</td>
                    <td><span class="badge bg-primary">${prod.category}</span></td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-info me-2 btn-edit" data-index="${index}">Editar</button>
                        <button class="btn btn-sm btn-outline-danger btn-delete" data-index="${index}">Eliminar</button>
                    </td>
                </tr>
            `);
        });
    }

    renderTable();

    function resetFormErrors() {
        $('#prodSku, #prodName, #prodCat').removeClass('is-invalid');
    }

    $('#btnAddProduct').on('click', function() {
        $('#productModalLabel').text('Nuevo Producto');
        $('#productForm')[0].reset();
        $('#editIndex').val('-1');
        resetFormErrors();
        productModal.show();
    });

    $('#btnSaveProduct').on('click', function() {
        let isValid = true;
        const sku = $('#prodSku').val().trim();
        const name = $('#prodName').val().trim();
        const category = $('#prodCat').val().trim();
        const index = parseInt($('#editIndex').val());

        if (sku === '') {
            $('#prodSku').addClass('is-invalid');
            isValid = false;
        } else {
            $('#prodSku').removeClass('is-invalid');
        }

        if (name === '') {
            $('#prodName').addClass('is-invalid');
            isValid = false;
        } else {
            $('#prodName').removeClass('is-invalid');
        }

        if (category === '') {
            $('#prodCat').addClass('is-invalid');
            isValid = false;
        } else {
            $('#prodCat').removeClass('is-invalid');
        }

        if(!isValid) return;

        if (index === -1) {
            products.push({ sku, name, category });
        } else {
            products[index] = { sku, name, category };
        }

        productModal.hide();
        renderTable();
    });

    $('#prodSku, #prodName, #prodCat').on('input', function() {
        if($(this).val().trim() !== '') {
            $(this).removeClass('is-invalid');
        }
    });

    $(document).on('click', '.btn-edit', function() {
        const index = $(this).data('index');
        const prod = products[index];

        $('#productModalLabel').text('Editar Producto');
        $('#editIndex').val(index);
        $('#prodSku').val(prod.sku);
        $('#prodName').val(prod.name);
        $('#prodCat').val(prod.category);
        
        resetFormErrors();
        productModal.show();
    });

    $(document).on('click', '.btn-delete', function() {
        const index = $(this).data('index');
        const prod = products[index];

        $('#deleteIndex').val(index);
        $('#deleteProductDetails').text(`${prod.sku} - ${prod.name}`);
        
        deleteModal.show();
    });

    $('#btnConfirmDelete').on('click', function() {
        const index = parseInt($('#deleteIndex').val());
        if (index >= 0) {
            products.splice(index, 1);
            deleteModal.hide();
            renderTable();
        }
    });
});
