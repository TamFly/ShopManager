<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Quản lý bán hàng</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="font-icon/css/font-awesome.min.css">
	<!-- <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css"> -->
</head>
<body>
	<div class="container">
		<a href="index.php" class="getapi"><img src="images/logoshop.png" alt=""></a>
		<div class="row">
			<div class="col-md-4">
				<div class="panel panel-info">
					<div class="panel-heading">
						<h3 class="panel-title">Menu quản lý</h3>
					</div>
					<div class="panel-body">
						<div class="list-group">
							<a href="?type=customer" class="list-group-item getapi" id="customer" title="Khách hàng">Khách hàng</a>
							<a href="?type=invoice" class="list-group-item getapi" id="invoice" title="Hóa đơn">Hóa đơn</a>
							<a href="?type=invoice_details" class="list-group-item getapi" id="invoice_details" title="Hóa đơn chi tiết">Hóa đơn chi tiết</a>
							<a href="?type=product" class="list-group-item getapi" id="product" title="Sản phẩm">Sản phẩm</a>
							<a href="?type=type_product" class="list-group-item getapi" id="type_product" title="Loại sản phẩm">Loại sản phẩm</a>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-8">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h3 class="panel-title" id="title-head">Quản lý bán hàng</h3>
					</div>
					<div class="panel-body">
						<div class="hide-to-view">
							<div class="row">
								<div class="col-md-6">
									<div class="panel panel-success">
										<div class="panel-heading">
											<div class="row">
												<div class="col-xs-3">
													<i class="fa fa-user fa-5x" aria-hidden="true"></i>
												</div>
												<div class="col-xs-9 text-right">
													<h1 id="countCustomer">0</h1>
													<h4>Khách hàng</h4>
												</div>
											</div>
										</div>
										<a href="?type=customer" class="getapi" title="Khách hàng">
											<div class="panel-body">
												<span class="pull-left">Xem chi tiết</span>
												<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
												<div class="clearfix"></div>
											</div>
										</a>
									</div>
								</div>
								<div class="col-md-6">
									<div class="panel panel-warning">
										<div class="panel-heading">
											<div class="row">
												<div class="col-xs-3">
													<i class="fa fa-shopping-basket fa-5x" aria-hidden="true"></i>
												</div>
												<div class="col-xs-9 text-right">
													<h1 id="countProduct">0</h1>
													<h4>Sản phẩm</h4>
												</div>
											</div>
										</div>
										<a href="?type=product" class="getapi" title="Sản phẩm">
											<div class="panel-body">
												<span class="pull-left">Xem chi tiết</span>
												<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
												<div class="clearfix"></div>
											</div>
										</a>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="panel panel-info">
										<div class="panel-heading">
											<div class="row">
												<div class="col-xs-3">
													<i class="fa fa-folder fa-5x" aria-hidden="true"></i>
												</div>
												<div class="col-xs-9 text-right">
													<h1 id="countTypeProduct">0</h1>
													<h4>Loại sản phẩm</h4>
												</div>
											</div>
										</div>
										<a href="?type=type_product" class="getapi" title="Loại sản phẩm">
											<div class="panel-body">
												<span class="pull-left">Xem chi tiết</span>
												<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
												<div class="clearfix"></div>
											</div>
										</a>
									</div>
								</div>
								<div class="col-md-6">
									<div class="panel panel-danger">
										<div class="panel-heading">
											<div class="row">
												<div class="col-xs-3">
													<i class="fa fa-sticky-note fa-5x" aria-hidden="true"></i>
												</div>
												<div class="col-xs-9 text-right">
													<h1 id="countInvoice">0</h1>
													<h4>Hóa đơn</h4>
												</div>
											</div>
										</div>
										<a href="?type=invoice_details" class="getapi" title="Hóa đơn chi tiết">
											<div class="panel-body">
												<span class="pull-left">Xem chi tiết</span>
												<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
												<div class="clearfix"></div>
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
						<!-- Modal Manager -->
						<div id="btnAddNew"></div>
						<div class="modal fade" id="addnew" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
										<h4 class="modal-title" id="modalTitle">Modal title</h4>
									</div>
									<div class="modal-body" id="content-add">

									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
        								<button type="button" class="btn btn-primary" data-loading-text="Loading..." id="btnAddDataToDb">Thêm mới</button>
									</div>
								</div>
							</div>
						</div>
						<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="modalEditTitle" aria-hidden="true">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
										<h4 class="modal-title" id="modalEditTitle">Modal title</h4>
									</div>
									<div class="modal-body" id="content-edit">

									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
        								<button type="button" class="btn btn-primary" data-loading-text="Loading..." id="btnEditDataFromDb">Chỉnh sửa</button>
									</div>
								</div>
							</div>
						</div>
						<div class="modal fade" id="details" tabindex="-1" role="dialog" aria-labelledby="actionDetailsTitle" aria-hidden="true">
							<div class="modal-dialog modal-sm">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
										<h4 class="modal-title" id="actionDetailsTitle">Modal title</h4>
									</div>
									<div class="modal-body" id="content-details">

									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
									</div>
								</div>
							</div>
						</div>
						<table class="table table-hover" id="showapi"></table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>