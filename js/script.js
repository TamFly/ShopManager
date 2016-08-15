$(document).ready(function() {
	$('a.getapi').click(function(){
		window.history.pushState({},'',$(this).attr("href"));
		$('#title-head').html($(this).attr('title'));
		loadData();
		return false;
	});
	
	loadData();

	function loadData() {
		$('#showapi').empty();
		var type = getUrlVars("type");
		if(type != null) {
			$('.hide-to-view').hide();
			$('#btnAddNew').html('<p><button type="button" class="btn btn-success" data-toggle="modal" data-target="#addnew" id="addData">Thêm mới</button></p>');
		}else{
			$('.hide-to-view').show();
			$('#btnAddNew').empty();
			$('#countCustomer').html(statisticalDashboard('customer'));
			$('#countProduct').html(statisticalDashboard('product'));
			$('#countTypeProduct').html(statisticalDashboard('type_product'));
			$('#countInvoice').html(statisticalDashboard('invoice_details'));
		}
		$.get('api.php', {
			type: type
		}, function(data){
			if(type == "customer") {
				var table = '<thead>'+
								'<td>Id</td>'+
								'<td>Họ tên</td>'+
								'<td>Email</td>'+
								'<td>Hành động</td>'+
							'</thead>';
				table += '<tbody>';
				for(var i = 0; i < data.customer.length; i++) {
					table += '<tr>'+
								'<td>'+data.customer[i].Id_Customer+'</td>'+
								'<td>'+data.customer[i].Full_Name+'</td>'+
								'<td>'+data.customer[i].Email+'</td>'+
								'<td>'+
									'<div class="btn-group">'+
										'<a href="?type='+type+'&act=details&id='+data.customer[i].Id_Customer+'" class="btn btn-warning action"><span class="glyphicon glyphicon-exclamation-sign"></span></a>'+
										'<a href="?type='+type+'&act=edit&id='+data.customer[i].Id_Customer+'" class="btn btn-success action"><span class="glyphicon glyphicon-edit"></span></a>'+
										'<a href="?type='+type+'&act=del&id='+data.customer[i].Id_Customer+'" class="btn btn-danger action"><span class="glyphicon glyphicon-remove-circle"></span></a>'+
									'</div>'+
								'</td>'+
							'</tr>';
				}
				table += '</tbody>';
				$('#showapi').append(table);
			}

			if(type == "invoice") {
				var table = '<thead>'+
								'<td>Id</td>'+
								'<td>Khách hàng</td>'+
								'<td>Ngày khởi tạo</td>'+
								'<td>Hành động</td>'
							'</thead>';
				table += '<tbody>';
				for(var i = 0; i < data.invoice.length; i++) {
					table += '<tr>'+
								'<td>'+data.invoice[i].Id_Invoice+'</td>'+
								'<td>'+getNameCustomer(data.invoice[i].Id_Customer)+'</td>'+
								'<td>'+data.invoice[i].Date_Create+'</td>'+
								'<td>'+
									'<div class="btn-group">'+
										'<a href="?type='+type+'&act=edit&id='+data.invoice[i].Id_Invoice+'" class="btn btn-success action"><span class="glyphicon glyphicon-edit"></span></a>'+
										'<a href="?type='+type+'&act=del&id='+data.invoice[i].Id_Invoice+'" class="btn btn-danger action"><span class="glyphicon glyphicon-remove-circle"></span></a>'+
									'</div>'+
								'</td>'+
							'</tr>';
				}
				table += '</tbody>';
				$('#showapi').append(table);
			}

			if(type == "invoice_details"){
				var table = '<thead>'+
								'<td>Id</td>'+
								'<td>Khách hàng</td>'+
								'<td>Sản phẩm</td>'+
								'<td>Số lượng</td>'+
								'<td>Hành động</td>'
							'</thead>';
				table += '<tbody>';
				for(var i = 0; i < data.invoice_details.length; i++) {
					table += '<tr>'+
								'<td>'+data.invoice_details[i].Id_Invoice_Details+'</td>'+
								'<td>'+getNameCustomer(data.invoice_details[i].Id_Customer)+'</td>'+
								'<td>'+getNameProduct(data.invoice_details[i].Id_Product)+'</td>'+
								'<td>'+data.invoice_details[i].Number+'</td>'+
								'<td>'+
									'<div class="btn-group">'+
										'<a href="?type='+type+'&act=details&id='+data.invoice_details[i].Id_Invoice_Details+'" class="btn btn-warning action"><span class="glyphicon glyphicon-exclamation-sign"></span></a>'+
										'<a href="?type='+type+'&act=edit&id='+data.invoice_details[i].Id_Invoice_Details+'" class="btn btn-success action"><span class="glyphicon glyphicon-edit"></span></a>'+
										'<a href="?type='+type+'&act=del&id='+data.invoice_details[i].Id_Invoice_Details+'" class="btn btn-danger action"><span class="glyphicon glyphicon-remove-circle"></span></a>'+
									'</div>'+
								'</td>'+
							'</tr>';
				}
				table += '</tbody>';
				$('#showapi').append(table);
			}

			if(type == "product") {
				var table = '<thead>'+
								'<td>Id</td>'+
								'<td>Tên sản phẩm</td>'+
								'<td>Loại sản phẩm</td>'+
								'<td>Giá</td>'+
								'<td>Hành động</td>'+
							'</thead>';
				table += '<tbody>';
				for(var i = 0; i < data.product.length; i++) {
					table += '<tr>'+
								'<td>'+data.product[i].Id_Product+'</td>'+
								'<td>'+data.product[i].Name_Product+'</td>'+
								'<td>'+getNameTypeProduct(data.product[i].Id_Type_Product)+'</td>'+
								'<td>'+data.product[i].Price+'/'+data.product[i].Unit+'</td>'+
								'<td>'+
									'<div class="btn-group">'+
										'<a href="?type='+type+'&act=edit&id='+data.product[i].Id_Product+'" class="btn btn-success action"><span class="glyphicon glyphicon-edit"></span></a>'+
										'<a href="?type='+type+'&act=del&id='+data.product[i].Id_Product+'" class="btn btn-danger action"><span class="glyphicon glyphicon-remove-circle"></span></a>'+
									'</div>'+
								'</td>'+
							'</tr>';
				}
				table += '</tbody>';
				$('#showapi').append(table);
			}

			if(type == "type_product") {
				var table = '<thead>'+
								'<td>Id</td>'+
								'<td>Loại sản phẩm</td>'+
								'<td>Mô tả</td>'+
								'<td>Hành động</td>'+
							'</thead>';
				table += '<tbody>';
				for(var i = 0; i < data.type_product.length; i++) {
					table += '<tr>'+
								'<td>'+data.type_product[i].Id_Type+'</td>'+
								'<td>'+data.type_product[i].Type_Name+'</td>'+
								'<td>'+data.type_product[i].Type_Description+'</td>'+
								'<td>'+
									'<div class="btn-group">'+
										'<a href="?type='+type+'&act=edit&id='+data.type_product[i].Id_Type+'" class="btn btn-success action"><span class="glyphicon glyphicon-edit"></span></a>'+
										'<a href="?type='+type+'&act=del&id='+data.type_product[i].Id_Type+'" class="btn btn-danger action"><span class="glyphicon glyphicon-remove-circle"></span></a>'+
									'</div>'+
								'</td>'+
							'</tr>';
				}
				table += '</tbody>';
				$('#showapi').append(table);
			}
		});
	}

	$(document).on('click', 'a.action', function() {
		window.history.pushState({},'',$(this).attr("href"));
		var type = getUrlVars("type");
		var act = getUrlVars("act");
		var id = getUrlVars("id");
		$.get('api.php', {
			type: type,
			act: act,
			id: id
		}, function(data) {
			if(act == "details"){
				var content = '';
				if(type == "customer"){
					if(data.result && data.details != null){
						$('#actionDetailsTitle').html('Chi tiết khách hàng');
						content = '<p>Id khách hàng: '+data.details.Id_Customer+'</p>'+
								'<p>Họ tên: '+data.details.Full_Name+'</p>'+
								'<p>Giới tính: '+(data.details.Sex == '1' ? 'Nam' : (data.details.Sex == '0' ? 'Nữ' : 'Không xác định'))+'</p>'+
								'<p>Email: '+data.details.Email+'</p>'+
								'<p>Số điện thoại: '+data.details.Phone_Number+'</p>'+
								'<p>Ngày sinh: '+data.details.BirthDay+'</p>'+
								'<p>Địa chỉ: '+data.details.Address+'</p>';
					}
				}

				if(type == "invoice_details"){
					if(data.result && data.details != null){
						$('#actionDetailsTitle').html('Hóa đơn chi tiết');
						content = '<p>Id hóa đơn: '+data.details.Id_Invoice_Details+'</p>'+
								'<p>Khách hàng: '+getNameCustomer(data.details.Id_Customer)+'</p>'+
								'<p>Email: '+getEmailCustomer(data.details.Id_Customer)+'</p>'+
								'<p>Sản phẩm: '+getNameProduct(data.details.Id_Product)+'</p>'+
								'<p>Ngày khởi tạo: '+data.details.Date_Create+'</p>'+
								'<p>Số lượng: '+data.details.Number+'</p>'+
								'<p>Giá tiền (1 sản phẩm): '+data.details.Price+'</p>'+
								'<p><hr/></p>'+
								'<div class="clearfix"><p class="pull-right text-danger">Tổng tiền: '+Number(data.details.Number)*Number(data.details.Price)+'</p></div>';
					}
				}
				$('#content-details').html(content);
				$('#details').modal('show');
			}

			if(act == "edit") {
				$('#btnEditDataFromDb').button('reset');
				var content = '';
				if(type == "customer") {
					if(data.result && data.edit != null){
						$('#modalEditTitle').html('Chỉnh sửa khách hàng');
						content = '<form role="form">'+
									'<div class="form-group">'+
										'<label for="customerFullNameEdit">Họ và tên</label>'+
										'<input type="text" class="form-control" id="customerFullNameEdit" placeholder="Enter Full Name" value="'+data.edit.Full_Name+'">'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="customerSexEdit">Giới tính</label>'+
										'<select id="customerSexEdit" class="form-control">'+
											'<option>--Chọn giới tính--</option>'+
											'<option value="1" '+(data.edit.Sex == 1 ? 'selected="selected"' : '')+'>Nam</option>'+
											'<option value="0" '+(data.edit.Sex == 0 ? 'selected="selected"' : '')+'>Nữ</option>'+
										'</select>'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="customerEmailEdit">Email</label>'+
										'<input type="email" class="form-control" id="customerEmailEdit" placeholder="Enter Email" value="'+data.edit.Email+'">'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="customerPhoneEdit">Số điện thoại</label>'+
										'<input type="phone" class="form-control" id="customerPhoneEdit" placeholder="Enter Phone Number" value="'+data.edit.Phone_Number+'">'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="customerBirthDayEdit">Ngày sinh</label>'+
										'<input type="date" class="form-control" id="customerBirthDayEdit" placeholder="Enter BirthDay" value="'+data.edit.BirthDay+'">'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="customerAddressEdit">Địa chỉ</label>'+
										'<input type="text" class="form-control" id="customerAddressEdit" placeholder="Enter Address" value="'+data.edit.Address+'">'+
									'</div>'+
								'</form>';
					}
				}

				if(type == "invoice") {
					if(data.result && data.edit != null){
						$('#modalEditTitle').html('Chỉnh sửa hóa đơn');
						content = '<form role="form">'+
									'<div class="form-group">'+
										'<label for="invoiceCustomerEdit">Khách hàng</label>'+
										'<select id="invoiceCustomerEdit" class="form-control">'+
											getCustomer(data.edit.Id_Customer)+
										'</select>'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="invoiceDateCreateEdit">Ngày tạo hóa đơn</label>'+
										'<input type="date" class="form-control" id="invoiceDateCreateEdit" value="'+data.edit.Date_Create+'" disabled="disabled">'+
									'</div>'+
								'</form>';
					}
				}

				if(type == "invoice_details") {
					if(data.result && data.edit != null){
						$('#modalEditTitle').html('Chỉnh sửa hóa đơn chi tiết');
						content = '<form role="form">'+
									'<div class="form-group">'+
										'<label for="invoiceDetailsInvoiceEdit">Chọn hóa đơn đã có</label>'+
										'<select id="invoiceDetailsInvoiceEdit" class="form-control">'+
											getInvoice(data.edit.Id_Invoice)+
										'</select>'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="invoiceDetailsCustomerEdit">Id khách hàng</label>'+
										'<div class="input-group">'+
											'<input type="number" class="form-control" id="invoiceDetailsCustomerEdit" placeholder="Enter Id Customer" disabled="disabled" value="'+data.edit.Id_Customer+'">'+
											'<span class="input-group-addon" id="invoiceDetailsCustomerShowEdit">'+getNameCustomer(data.edit.Id_Customer)+'</span>'+
										'</div>'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="invoiceDetailsProductEdit">Chọn sản phẩm</label>'+
										'<select id="invoiceDetailsProductEdit" class="form-control">'+
											getProduct(data.edit.Id_Product)+
										'</select>'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="invoiceDetailsPriceEdit">Giá sản phẩm</label>'+
										'<div class="input-group">'+
											'<input type="number" class="form-control" id="invoiceDetailsPriceEdit" placeholder="Enter Price" disabled="disabled" value="'+data.edit.Price+'">'+
											'<span class="input-group-addon">VNĐ</span>'+
										'</div>'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="invoiceDetailsNumberEdit">Số lượng sản phẩm</label>'+
										'<input type="number" class="form-control" id="invoiceDetailsNumberEdit" placeholder="Enter Number Product" value="'+data.edit.Number+'">'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="invoiceDetailsMoneyTotalEdit">Tổng tiền</label>'+
										'<div class="input-group">'+
											'<input type="number" class="form-control" id="invoiceDetailsMoneyTotalEdit" placeholder="Money Total" disabled="disabled" value='+data.edit.Price * data.edit.Number+'>'+
											'<span class="input-group-addon">VNĐ</span>'+
										'</div>'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="invoiceDetailsDateCreateEdit">Ngày tạo hóa đơn</label>'+
										'<input type="date" class="form-control" id="invoiceDetailsDateCreateEdit" value="'+data.edit.Date_Create+'" disabled="disabled">'+
									'</div>'+
								'</form>';
					}
				}

				if(type == "product") {
					if(data.result && data.edit != null){
						$('#modalEditTitle').html('Chỉnh sửa sản phẩm');
						content = '<form role="form">'+
									'<div class="form-group">'+
										'<label for="productTypeProductEdit">Loại sản phẩm</label>'+
										'<select id="productTypeProductEdit" class="form-control">'+
											getTypeProduct(data.edit.Id_Type_Product)+
										'</select>'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="productNameEdit">Tên sản phẩm</label>'+
										'<input type="text" class="form-control" id="productNameEdit" placeholder="Enter Product Name" value="'+data.edit.Name_Product+'">'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="productUnitEdit">Đơn vị tính</label>'+
										'<input type="text" class="form-control" id="productUnitEdit" placeholder="Enter Unit" value="'+data.edit.Unit+'">'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="productPriceEdit">Giá sản phẩm</label>'+
										'<div class="input-group">'+
											'<input type="number" class="form-control" id="productPriceEdit" placeholder="Enter Price Product" value="'+data.edit.Price+'">'+
											'<span class="input-group-addon">VNĐ</span>'+
										'</div>'+
									'</div>'+
								'</form>';
					}
				}

				if(type == "type_product") {
					if(data.result && data.edit != null){
						$('#modalEditTitle').html('Chỉnh sửa loại sản phẩm');
						content = '<form role="form">'+
									'<div class="form-group">'+
										'<label for="typeProductNameEdit">Tên loại</label>'+
										'<input type="text" class="form-control" id="typeProductNameEdit" placeholder="Enter Type Name" value="'+data.edit.Type_Name+'">'+
									'</div>'+
									'<div class="form-group">'+
										'<label for="typeProductDescriptionEdit">Mô tả</label>'+
										'<textarea class="form-control" id="typeProductDescriptionEdit">'+data.edit.Type_Description+'</textarea>'+
									'</div>'+
								'</form>';
					}
				}
				$('#content-edit').html(content);
				$('#editModal').modal('show');
			}

			if(act == "del") {
				if(data.result) {
					loadData();
				}
			}
		});
		return false;
	});

	$(document).on('click', '#addData', function() {
		$('#modalTitle').html($('#title-head').html());
		$('#btnAddDataToDb').button('reset');
		$('#content-add').empty();
		var type = getUrlVars("type");
		var content;
		if(type == "customer") {
			content = '<form role="form">'+
						'<div class="form-group">'+
							'<label for="customerFullName">Họ và tên</label>'+
							'<input type="text" class="form-control" id="customerFullName" placeholder="Enter Full Name">'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="customerSex">Giới tính</label>'+
							'<select id="customerSex" class="form-control">'+
								'<option>--Chọn giới tính--</option>'+
								'<option value="1">Nam</option>'+
								'<option value="0">Nữ</option>'+
							'</select>'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="customerEmail">Email</label>'+
							'<input type="email" class="form-control" id="customerEmail" placeholder="Enter Email">'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="customerPhone">Số điện thoại</label>'+
							'<input type="phone" class="form-control" id="customerPhone" placeholder="Enter Phone Number">'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="customerBirthDay">Ngày sinh</label>'+
							'<input type="date" class="form-control" id="customerBirthDay" placeholder="Enter BirthDay">'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="customerAddress">Địa chỉ</label>'+
							'<input type="text" class="form-control" id="customerAddress" placeholder="Enter Address">'+
						'</div>'+
					'</form>';
		}

		if(type == "invoice") {
			var d = new Date();
			var toDay = d.getFullYear()+'-'+(d.getMonth() <= 10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1))+'-'+(d.getDay() < 10 ? '0'+d.getDay() : d.getDay());
			content = '<form role="form">'+
						'<div class="form-group">'+
							'<label for="invoiceCustomer">Khách hàng</label>'+
							'<select id="invoiceCustomer" class="form-control">'+
								getCustomer(0)+
							'</select>'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="invoiceDateCreate">Ngày tạo hóa đơn</label>'+
							'<input type="date" class="form-control" id="invoiceDateCreate" value="'+toDay+'" disabled="disabled">'+
						'</div>'+
					'</form>';
		}

		if(type == "invoice_details") {
			var d = new Date();
			var toDay = d.getFullYear()+'-'+(d.getMonth() <= 10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1))+'-'+(d.getDay() < 10 ? '0'+d.getDay() : d.getDay());
			content = '<form role="form">'+
						'<div class="form-group">'+
							'<label for="invoiceDetailsInvoice">Chọn hóa đơn đã có</label>'+
							'<select id="invoiceDetailsInvoice" class="form-control">'+
								getInvoice(0)+
							'</select>'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="invoiceDetailsCustomer">Id khách hàng</label>'+
							'<div class="input-group">'+
								'<input type="number" class="form-control" id="invoiceDetailsCustomer" placeholder="Enter Id Customer" disabled="disabled">'+
								'<span class="input-group-addon" id="invoiceDetailsCustomerShow">Tên khách hàng</span>'+
							'</div>'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="invoiceDetailsProduct">Chọn sản phẩm</label>'+
							'<select id="invoiceDetailsProduct" class="form-control">'+
								getProduct(0)+
							'</select>'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="invoiceDetailsPrice">Giá sản phẩm</label>'+
							'<div class="input-group">'+
								'<input type="number" class="form-control" id="invoiceDetailsPrice" placeholder="Enter Price" disabled="disabled">'+
								'<span class="input-group-addon">VNĐ</span>'+
							'</div>'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="invoiceDetailsNumber">Số lượng sản phẩm</label>'+
							'<input type="number" class="form-control" id="invoiceDetailsNumber" placeholder="Enter Number Product" value="1">'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="invoiceDetailsMoneyTotal">Tổng tiền</label>'+
							'<div class="input-group">'+
								'<input type="number" class="form-control" id="invoiceDetailsMoneyTotal" placeholder="Money Total" disabled="disabled">'+
								'<span class="input-group-addon">VNĐ</span>'+
							'</div>'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="invoiceDetailsDateCreate">Ngày tạo hóa đơn</label>'+
							'<input type="date" class="form-control" id="invoiceDetailsDateCreate" value="'+toDay+'" disabled="disabled">'+
						'</div>'+
					'</form>';
		}

		if(type == "product"){
			content = '<form role="form">'+
						'<div class="form-group">'+
							'<label for="productTypeProduct">Loại sản phẩm</label>'+
							'<select id="productTypeProduct" class="form-control">'+
								getTypeProduct(0)+
							'</select>'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="productName">Tên sản phẩm</label>'+
							'<input type="text" class="form-control" id="productName" placeholder="Enter Product Name">'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="productUnit">Đơn vị tính</label>'+
							'<input type="text" class="form-control" id="productUnit" placeholder="Enter Unit">'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="productPrice">Giá sản phẩm</label>'+
							'<div class="input-group">'+
								'<input type="number" class="form-control" id="productPrice" placeholder="Enter Price Product">'+
								'<span class="input-group-addon">VNĐ</span>'+
							'</div>'+
						'</div>'+
					'</form>';
		}

		if(type == "type_product") {
			content = '<form role="form">'+
						'<div class="form-group">'+
							'<label for="typeProductName">Tên loại</label>'+
							'<input type="text" class="form-control" id="typeProductName" placeholder="Enter Type Name">'+
						'</div>'+
						'<div class="form-group">'+
							'<label for="typeProductDescription">Mô tả</label>'+
							'<textarea class="form-control" id="typeProductDescription"></textarea>'+
						'</div>'+
					'</form>';
		}
		$('#content-add').html(content);
	});

	$(document).on('click', '#btnAddDataToDb', function() {
		var btn = $(this);
		btn.button('loading');
		var notification = '<div class="alert alert-danger alert-dismissible fade in" role="alert">'+
								'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
									'<span aria-hidden="true">&times;</span>'+
								'</button>'+
								'Có lỗi xảy ra vui lòng thử lại'+
							'</div>';
		var type = getUrlVars("type");
		if(type == "customer") {
			$.post('api.php', {
				type: type,
				act: 'add',
				full_name_customer: $('#customerFullName').val(),
				sex_customer: Number($('#customerSex').val()),
				email_customer: $('#customerEmail').val(),
				phone_number_customer: $('#customerPhone').val(),
				birthday_customer: $('#customerBirthDay').val(),
				address_customer: $('#customerAddress').val()
			}, function(data){
				setTimeout(function(){
					if(data.result) {
						$('#addnew').modal('hide');
						loadData();
					}else{
						btn.button('reset');
						$('#content-add form').prepend(notification);
						setTimeout(function(){$('.alert').alert('close');}, 3000);
					}
				}, 1000);
			});
		}

		if(type == "invoice") {
			$.post('api.php', {
				type: type,
				act: 'add',
				id_customer: Number($('#invoiceCustomer').val()),
				date_create_invoice: $('#invoiceDateCreate').val()
			}, function(data) {
				setTimeout(function(){
					if(data.result) {
						$('#addnew').modal('hide');
						loadData();
					}else{
						btn.button('reset');
						$('#content-add form').prepend(notification);
						setTimeout(function(){$('.alert').alert('close');}, 3000);
					}
				}, 1000);
			});
		}

		if(type == "invoice_details") {
			$.post('api.php', {
				type: type,
				act: 'add',
				id_invoice: Number($('#invoiceDetailsInvoice').val()),
				id_customer: Number($('#invoiceDetailsCustomer').val()),
				id_product: Number($('#invoiceDetailsProduct').val()),
				number_product: Number($('#invoiceDetailsNumber').val()),
				price_product: Number($('#invoiceDetailsPrice').val()),
				date_create_invoice_details: $('#invoiceDetailsDateCreate').val()
			}, function(data) {
				setTimeout(function(){
					if(data.result) {
						$('#addnew').modal('hide');
						loadData();
					}else{
						btn.button('reset');
						$('#content-add form').prepend(notification);
						setTimeout(function(){$('.alert').alert('close');}, 3000);
					}
				}, 1000);
			});
		}

		if(type == "product") {
			$.post('api.php', {
				type: type,
				act: 'add',
				id_type_product: Number($('#productTypeProduct').val()),
				name_product: $('#productName').val(),
				unit_product: $('#productUnit').val(),
				price_product: Number($('#productPrice').val())
			}, function(data){
				setTimeout(function(){
					if(data.result) {
						$('#addnew').modal('hide');
						loadData();
					}else{
						btn.button('reset');
						$('#content-add form').prepend(notification);
						setTimeout(function(){$('.alert').alert('close');}, 3000);
					}
				}, 1000);
			});
		}

		if(type == "type_product") {
			$.post('api.php', {
				type: type,
				act: 'add',
				name_type_product: $('#typeProductName').val(),
				description_type_product: $('#typeProductDescription').val()
			}, function(data){
				setTimeout(function(){
					if(data.result) {
						$('#addnew').modal('hide');
						loadData();
					}else{
						btn.button('reset');
						$('#content-add form').prepend(notification);
						setTimeout(function(){$('.alert').alert('close');}, 3000);
					}
				}, 1000);
			});
		}
	});

	$(document).on('click', '#btnEditDataFromDb', function() {
		var btn = $(this);
		btn.button('loading');
		var notification = '<div class="alert alert-danger alert-dismissible fade in" role="alert">'+
								'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
									'<span aria-hidden="true">&times;</span>'+
								'</button>'+
								'Có lỗi xảy ra vui lòng thử lại'+
							'</div>';
		var type = getUrlVars("type");
		var id = getUrlVars("id");
		if(type == "customer") {
			$.post('api.php', {
				type: type,
				act: 'editok',
				id: id,
				full_name_customer: $('#customerFullNameEdit').val(),
				sex_customer: Number($('#customerSexEdit').val()),
				email_customer: $('#customerEmailEdit').val(),
				phone_number_customer: $('#customerPhoneEdit').val(),
				birthday_customer: $('#customerBirthDayEdit').val(),
				address_customer: $('#customerAddressEdit').val()
			}, function(data){
				setTimeout(function(){
					if(data.result) {
						$('#editModal').modal('hide');
						loadData();
					}else{
						btn.button('reset');
						$('#content-edit form').prepend(notification);
						setTimeout(function(){$('.alert').alert('close');}, 3000);
					}
				}, 1000);
			});
		}

		if(type == "invoice") {
			$.post('api.php', {
				type: type,
				act: 'editok',
				id: id,
				id_customer: Number($('#invoiceCustomerEdit').val()),
				date_create_invoice: $('#invoiceDateCreateEdit').val()
			}, function(data) {
				setTimeout(function(){
					if(data.result) {
						$('#editModal').modal('hide');
						loadData();
					}else{
						btn.button('reset');
						$('#content-edit form').prepend(notification);
						setTimeout(function(){$('.alert').alert('close');}, 3000);
					}
				}, 1000);
			});
		}

		if(type == "invoice_details") {
			$.post('api.php', {
				type: type,
				act: 'editok',
				id: id,
				id_invoice: Number($('#invoiceDetailsInvoiceEdit').val()),
				id_customer: Number($('#invoiceDetailsCustomerEdit').val()),
				id_product: Number($('#invoiceDetailsProductEdit').val()),
				number_product: Number($('#invoiceDetailsNumberEdit').val()),
				price_product: Number($('#invoiceDetailsPriceEdit').val()),
				date_create_invoice_details: $('#invoiceDetailsDateCreateEdit').val()
			}, function(data) {
				setTimeout(function(){
					if(data.result) {
						$('#editModal').modal('hide');
						loadData();
					}else{
						btn.button('reset');
						$('#content-edit form').prepend(notification);
						setTimeout(function(){$('.alert').alert('close');}, 3000);
					}
				}, 1000);
			});
		}

		if(type == "product") {
			$.post('api.php', {
				type: type,
				act: 'editok',
				id: id,
				id_type_product: Number($('#productTypeProductEdit').val()),
				name_product: $('#productNameEdit').val(),
				unit_product: $('#productUnitEdit').val(),
				price_product: Number($('#productPriceEdit').val())
			}, function(data){
				setTimeout(function(){
					if(data.result) {
						$('#editModal').modal('hide');
						loadData();
					}else{
						btn.button('reset');
						$('#content-edit form').prepend(notification);
						setTimeout(function(){$('.alert').alert('close');}, 3000);
					}
				}, 1000);
			});
		}

		if(type == "type_product") {
			$.post('api.php', {
				type: type,
				act: 'editok',
				id: id,
				name_type_product: $('#typeProductNameEdit').val(),
				description_type_product: $('#typeProductDescriptionEdit').val()
			}, function(data){
				setTimeout(function(){
					if(data.result) {
						$('#editModal').modal('hide');
						loadData();
					}else{
						btn.button('reset');
						$('#content-edit form').prepend(notification);
						setTimeout(function(){$('.alert').alert('close');}, 3000);
					}
				}, 1000);
			});
		}
	});

	function getUrlVars(value){
		var url = window.location.search;
		var val = url.split("&");
		var ret;
		for(var i = 0; i < val.length; i++){
			var vt = val[i].indexOf(value);
			if(vt != -1){
				ret = val[i].slice(vt);
				return ret.split("=")[1];
			}
		}
	}

	function getCustomer(id) {
		var getCustomer = '';
		$.ajax({
			async: false,
			type: 'GET',
			url: 'api.php',
			data: {
				type: "customer"
			},
			success: function(data){
				getCustomer += '<option>--Chọn khách hàng--</option>';
				if(data.result){
					for(var i = 0; i < data.customer.length; i++){
						getCustomer += '<option value="'+data.customer[i].Id_Customer+'" '+(data.customer[i].Id_Customer == id ? 'selected="selected"' : '')+'>'+data.customer[i].Full_Name+' - '+data.customer[i].Email+'</option>';
					}
				}
			}
		});
		return getCustomer;
	}

	function getTypeProduct(id) {
		var getTypeProduct = '';
		$.ajax({
			async: false,
			type: 'GET',
			url: 'api.php',
			data: {
				type: "type_product"
			},
			success: function(data){
				getTypeProduct += '<option>--Chọn loại sản phẩm--</option>';
				if(data.result){
					for(var i = 0; i < data.type_product.length; i++){
						getTypeProduct += '<option value="'+data.type_product[i].Id_Type+'" '+(data.type_product[i].Id_Type == id ? 'selected="selected"' : '')+'>'+data.type_product[i].Type_Name+'</option>';
					}
				}
			}
		});
		return getTypeProduct;
	}

	function getNameCustomer(id) {
		var getNameCustomer = '';
		$.ajax({
			async: false,
			type: 'GET',
			url: 'api.php',
			data: {
				type: "customer",
				act: "details",
				id: id
			},
			success: function(data){
				if(data.result){
					getNameCustomer = data.details.Full_Name;
				}
			}
		});
		return getNameCustomer;
	}

	function getEmailCustomer(id) {
		var getEmailCustomer = '';
		$.ajax({
			async: false,
			type: 'GET',
			url: 'api.php',
			data: {
				type: "customer",
				act: "details",
				id: id
			},
			success: function(data){
				if(data.result){
					getEmailCustomer = data.details.Email;
				}
			}
		});
		return getEmailCustomer;
	}

	function getNameProduct(id) {
		var getNameProduct = '';
		$.ajax({
			async: false,
			type: 'GET',
			url: 'api.php',
			data: {
				type: "product",
				act: "details",
				id: id
			},
			success: function(data){
				if(data.result){
					getNameProduct = data.details.Name_Product;
				}
			}
		});
		return getNameProduct;
	}

	function getNameTypeProduct(id) {
		var getNameTypeProduct = '';
		$.ajax({
			async: false,
			type: 'GET',
			url: 'api.php',
			data: {
				type: "type_product",
				act: "details",
				id: id
			},
			success: function(data){
				if(data.result){
					getNameTypeProduct = data.details.Type_Name;
				}
			}
		});
		return getNameTypeProduct;
	}

	function getInvoice(id) {
		var getInvoice = '';
		$.ajax({
			async: false,
			type: 'GET',
			url: 'api.php',
			data: {
				type: "invoice"
			},
			success: function(data) {
				getInvoice += '<option>--Chọn hóa đơn--</option>';
				if(data.result){
					for(var i = 0; i < data.invoice.length; i++){
						getInvoice += '<option value="'+data.invoice[i].Id_Invoice+'" '+(data.invoice[i].Id_Invoice == id ? 'selected="selected"' : '')+'>'+data.invoice[i].Id_Invoice+' - '+getEmailCustomer(data.invoice[i].Id_Customer)+' ('+data.invoice[i].Date_Create+')</option>';
					}
				}
			}
		})
		return getInvoice;
	}

	function getProduct(id) {
		var getProduct = '';
		$.ajax({
			async: false,
			type: 'GET',
			url: 'api.php',
			data: {
				type: "product"
			},
			success: function(data) {
				getProduct += '<option>--Chọn sản phẩm--</option>';
				if(data.result){
					for(var i = 0; i < data.product.length; i++){
						getProduct += '<option value="'+data.product[i].Id_Product+'" '+(data.product[i].Id_Product == id ? 'selected="selected"' : '')+'>'+data.product[i].Name_Product+'</option>';
					}
				}
			}
		})
		return getProduct;
	}

	function statisticalDashboard(type) {
		var result = '';
		$.ajax({
			async: false,
			type: 'GET',
			url: 'api.php',
			data: {
				type: type
			},
			success: function(data) {
				if(type == "customer")
					result = data.customer.length;
				if(type == "invoice")
					result = data.invoice.length;
				if(type == "invoice_details")
					result = data.invoice_details.length;
				if(type == "product")
					result = data.product.length;
				if(type == "type_product")
					result = data.type_product.length;
			}
		});
		return result;
	}

	//ScriptAdd
	$(document).on('change', '#invoiceDetailsProduct', function() {
		$.get('api.php', {
			type: "product",
			act: "details",
			id: Number($(this).val())
		}, function(data) {
			if(data.result) {
				$('#invoiceDetailsPrice').val(data.details.Price);
				$('#invoiceDetailsMoneyTotal').val(Number($('#invoiceDetailsPrice').val()) * Number($('#invoiceDetailsNumber').val()));
			}
		});
	});

	$(document).on('change', '#invoiceDetailsInvoice', function() {
		$.get('api.php', {
			type: "invoice",
			act: "details",
			id: Number($(this).val())
		}, function(data) {
			if(data.result) {
				$('#invoiceDetailsCustomerShow').html(getNameCustomer(data.details.Id_Customer));
				$('#invoiceDetailsCustomer').val(data.details.Id_Customer);
			}
		});
	});

	$(document).on('input', '#invoiceDetailsNumber', function() {
		$('#invoiceDetailsMoneyTotal').val(Number($('#invoiceDetailsPrice').val()) * Number($('#invoiceDetailsNumber').val()));
	});


	//ScriptEdit
	$(document).on('change', '#invoiceDetailsProductEdit', function() {
		$.get('api.php', {
			type: "product",
			act: "details",
			id: Number($(this).val())
		}, function(data) {
			if(data.result) {
				$('#invoiceDetailsPriceEdit').val(data.details.Price);
				$('#invoiceDetailsMoneyTotalEdit').val(Number($('#invoiceDetailsPriceEdit').val()) * Number($('#invoiceDetailsNumberEdit').val()));
			}
		});
	});

	$(document).on('change', '#invoiceDetailsInvoiceEdit', function() {
		$.get('api.php', {
			type: "invoice",
			act: "details",
			id: Number($(this).val())
		}, function(data) {
			if(data.result) {
				$('#invoiceDetailsCustomerShowEdit').html(getNameCustomer(data.details.Id_Customer));
				$('#invoiceDetailsCustomerEdit').val(data.details.Id_Customer);
			}
		});
	});

	$(document).on('input', '#invoiceDetailsNumberEdit', function() {
		$('#invoiceDetailsMoneyTotalEdit').val(Number($('#invoiceDetailsPriceEdit').val()) * Number($('#invoiceDetailsNumberEdit').val()));
	});
});